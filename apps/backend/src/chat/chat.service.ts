import type { Database } from 'src/providers/postgres-db';
import type ImageKit from 'imagekit';
import { Inject, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EmailService } from '../email/email.service';
import type { CreateChatDTO } from '../DTOs/chat.dto';
import {
  attachmentsTable,
  chatsTable,
  messagesTable,
  participantsTable,
  usersTable,
} from 'src/schema';
import SnowflakeId from 'snowflake-id';
import { and, desc, eq } from 'drizzle-orm';
import { Message, UserPayload } from '@repo/shared-types';

@Injectable()
export class ChatService {
  constructor(
    @Inject('NeonDBProvider') private readonly db: Database,
    @Inject('ImageKitProvider') private readonly imageKit: ImageKit,
    private readonly emailService: EmailService,
    private readonly configService: ConfigService,
  ) {}

  private async hasExistingChat(
    currentUserId: string,
    recipientId: string,
  ): Promise<boolean> {
    const allCurrUserChats = await this.db
      .select()
      .from(participantsTable)
      .where(eq(participantsTable.userId, currentUserId));

    const recipientChats = await this.db
      .select()
      .from(participantsTable)
      .where(eq(participantsTable.userId, recipientId));

    return allCurrUserChats.some((currUserChat) =>
      recipientChats.some(
        (recipientChat) => recipientChat.chatId === currUserChat.chatId,
      ),
    );
  }

  private async uploadAttachments(
    attachments: Express.Multer.File[],
    snowflake: SnowflakeId,
    chatId: string,
    messageId: string,
  ) {
    for (const attachment of attachments) {
      const fileType =
        attachment.mimetype === 'application/pdf' ? 'pdf' : 'image';
      const fileName = attachment.originalname;

      const uploadedFile = await this.imageKit.upload({
        file: attachment.buffer,
        folder: `/chats/${chatId}`,
        fileName: fileName,
      });

      const url = uploadedFile.url;

      if (!url)
        throw new HttpException(
          'Failed to upload attachment',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );

      await this.db.insert(attachmentsTable).values({
        id: snowflake.generate().toString(),
        messageId,
        fileName,
        url,
        fileType,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
  }

  async createChat(
    createChatDTO: CreateChatDTO,
    currUser: UserPayload,
    attachments?: Express.Multer.File[],
  ) {
    const { chatID, to, message } = createChatDTO;
    const chatId = chatID;
    const recipientId = to;

    if (await this.hasExistingChat(currUser.id, recipientId))
      throw new HttpException('Chat already exists', 400);

    const snowflake = new SnowflakeId({
      mid: 42,
      offset: (2019 - 1970) * 31536000 * 1000,
    });

    await this.db
      .insert(chatsTable)
      .values({
        id: chatId,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    await this.db.insert(participantsTable).values([
      {
        id: snowflake.generate().toString(),
        chatId,
        userId: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: snowflake.generate().toString(),
        chatId,
        userId: recipientId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: snowflake.generate().toString(),
        chatId,
        userId: currUser.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    const createdMessage = (await this.db
      .insert(messagesTable)
      .values({
        id: snowflake.generate().toString(),
        chatId,
        senderId: currUser.id,
        message,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning()) as Message[];

    if (!createdMessage.length) {
      throw new HttpException('Failed to create message', 500);
    }

    await this.db
      .update(chatsTable)
      .set({ latestMessageId: createdMessage[0].id })
      .where(eq(chatsTable.id, chatId));

    if (attachments && attachments.length > 0) {
      await this.uploadAttachments(
        attachments,
        snowflake,
        chatId,
        createdMessage[0].id,
      );
    }

    const [recipient] = await this.db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, recipientId));

    await this.emailService.sendNewContactMessageNotifEmail(
      recipient.email,
      `${currUser.firstName} ${currUser.lastName}`,
      createdMessage[0].createdAt.toISOString() ?? '-',
      message,
      `${currUser.firstName[0]}${currUser.lastName[0]}`,
      `${this.configService.getOrThrow<string>('FRONTEND_URL')}/inbox/c/${chatId}`,
    );
  }

  async getAllChats(currentUserId: string) {
    const chats = await this.db.query.chatsTable.findMany({
      where: (chats, { exists }) =>
        exists(
          this.db
            .select()
            .from(participantsTable)
            .where(
              and(
                eq(participantsTable.chatId, chats.id),
                eq(participantsTable.userId, currentUserId),
              ),
            ),
        ),
      orderBy: desc(chatsTable.createdAt),
      columns: {
        id: true,
        latestMessage: true,
      },
      with: {
        latestMessage: {
          columns: {
            id: true,
            message: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        participants: {
          columns: {
            id: false,
            chatId: false,
            userId: false,
            createdAt: false,
            updatedAt: false,
          },
          with: {
            user: {
              columns: {
                id: true,
                firstName: true,
                lastName: true,
                profilePicture: true,
                onboardingAnswers: true,
              },
            },
          },
        },
      },
    });
    return chats;
  }

  async getChatMessagesById(chatId: string) {
    const messages = await this.db.query.messagesTable.findMany({
      where: (messages, { eq }) => eq(messages.chatId, chatId),
      with: {
        sender: {
          columns: {
            id: true,
            firstName: true,
            lastName: true,
            profilePicture: true,
            onboardingAnswers: true,
          },
        },
        attachments: {
          columns: {
            id: true,
            messageId: false,
            fileName: true,
            url: true,
            fileType: true,
            createdAt: false,
            updatedAt: false,
          },
        },
      },
    });

    return messages;
  }

  async addMessage(
    chatId: string,
    currentUserId: string,
    message: string,
    attachments?: Express.Multer.File[],
  ): Promise<void> {
    if (!message.trim() && !attachments?.length)
      throw new HttpException(
        'Message cannot be empty',
        HttpStatus.BAD_REQUEST,
      );

    const snowflake = new SnowflakeId({
      mid: 42,
      offset: (2019 - 1970) * 31536000 * 1000,
    });

    const messageId = snowflake.generate().toString();

    await this.db.insert(messagesTable).values({
      id: messageId,
      chatId,
      senderId: currentUserId,
      message,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await this.db
      .update(chatsTable)
      .set({ latestMessageId: messageId })
      .where(eq(chatsTable.id, chatId));

    if (attachments?.length)
      await this.uploadAttachments(attachments, snowflake, chatId, messageId);
  }

  async getChatParticipants(chatId: string) {
    const participants = await this.db.query.participantsTable.findMany({
      where: (chatParticipants, { eq }) => eq(chatParticipants.chatId, chatId),
      with: {
        user: {
          columns: {
            id: true,
            firstName: true,
            lastName: true,
            profilePicture: true,
            onboardingAnswers: true,
          },
        },
      },
    });

    // EXCLUDES the admin user with userId '1'
    return participants.length
      ? participants.filter((participant) => participant.userId !== '1')
      : [];
  }
}
