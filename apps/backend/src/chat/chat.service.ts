import { Injectable } from '@nestjs/common';
import type { Database } from 'src/providers/postgres-db';
import { Inject, HttpException } from '@nestjs/common';
import type { CreateChatDTO } from '../DTOs/chat.dto';
import { chatsTable, messagesTable, participantsTable } from 'src/schema';
import SnowflakeId from 'snowflake-id';
import { and, eq } from 'drizzle-orm';

@Injectable()
export class ChatService {
  constructor(@Inject('NeonDBProvider') private readonly db: Database) {}

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

  async createChat(createChatDTO: CreateChatDTO, currentUserId: string) {
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
              },
            },
          },
        },
        messages: {
          columns: {
            chatId: false,
            senderId: false,
          },
          with: {
            sender: {
              columns: {
                id: true,
                firstName: true,
                lastName: true,
                profilePicture: true,
              },
            },
          },
        },
      },
    });
    return chats;
  }
}
