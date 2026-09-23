import type { Database } from 'src/providers/postgres-db';
import type ImageKit from 'imagekit';
import { Inject, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import type { CreateChatDTO } from '../DTOs/chat.dto';
import {
  attachmentsTable,
  chatsTable,
  messagesTable,
  participantsTable,
} from 'src/schema';
import SnowflakeId from 'snowflake-id';
import { and, desc, eq } from 'drizzle-orm';

@Injectable()
export class ChatService {
  constructor(
    @Inject('NeonDBProvider') private readonly db: Database,
    @Inject('ImageKitProvider') private readonly imageKit: ImageKit,
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

  async createChat(
    createChatDTO: CreateChatDTO,
    currentUserId: string,
    attachments?: Express.Multer.File[],
  ) {
    const { chatID, to, message } = createChatDTO;
    const chatId = chatID;
    const recipientId = to;

    if (await this.hasExistingChat(currentUserId, recipientId))
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
        userId: currentUserId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await this.db.insert(messagesTable).values({
      id: snowflake.generate().toString(),
      chatId,
      senderId: currentUserId,
      message,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
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
        createdAt: false,
        updatedAt: false,
      },
      with: {
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

  async getChatById(chatId: string) {
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
            fileId: true,
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
  ) {
    if (!message.trim())
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

    // TODO - add this logic inside of the method when creating a chat
    // TODO - make messages on the frontend handle attachments

    if (attachments?.length) {
      for (const attachment of attachments) {
        const fileType =
          attachment.mimetype === 'application/pdf' ? 'pdf' : 'image';
        const fileName = attachment.originalname;

        const uploadedFile = await this.imageKit.upload({
          file: attachment.buffer,
          folder: `/chats/${chatId}`,
          fileName: fileName,
        });

        const fileId = uploadedFile.fileId;

        if (!fileId)
          throw new HttpException(
            'Failed to upload attachment',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );

        await this.db.insert(attachmentsTable).values({
          id: snowflake.generate().toString(),
          messageId,
          fileName,
          fileId,
          fileType,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    }
  }
}
