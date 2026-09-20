import { Injectable } from '@nestjs/common';
import type { Database } from 'src/providers/postgres-db';
import { Inject, HttpException } from '@nestjs/common';
import type { CreateChatDTO } from '../DTOs/chat.dto';
import { chatsTable, messagesTable, participantsTable } from 'src/schema';
import SnowflakeId from 'snowflake-id';
import { eq, inArray } from 'drizzle-orm';

@Injectable()
export class ChatService {
  constructor(@Inject('NeonDBProvider') private readonly db: Database) {}

  private async hasExistingChat(
    currentUserId: bigint,
    recipientId: bigint,
  ): Promise<boolean> {
    const currentUserChats = await this.db
      .select()
      .from(participantsTable)
      .where(eq(participantsTable.userId, currentUserId));

    const recipientChats = await this.db
      .select()
      .from(participantsTable)
      .where(eq(participantsTable.userId, recipientId));

    const existingChat = currentUserChats.find((chat) =>
      recipientChats.some(
        (recipientChat) => recipientChat.chatId === chat.chatId,
      ),
    );

    return !!existingChat;
  }

  async createChat(createChatDTO: CreateChatDTO, currentUserId: bigint) {
    const { chatID, to, message } = createChatDTO;
    const chatId = BigInt(chatID);
    const recipientId = BigInt(to);

    if (await this.hasExistingChat(currentUserId, recipientId))
      throw new HttpException('Chat already exists', 400);

    const snowflake = new SnowflakeId({
      mid: 42,
      offset: (2019 - 1970) * 31536000 * 1000,
    });

    const [chat] = await this.db
      .insert(chatsTable)
      .values({
        id: chatId,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    await this.db.insert(participantsTable).values([
      {
        id: snowflake.generate(),
        chatId: chatId,
        userId: 1n,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: snowflake.generate(),
        chatId: chatId,
        userId: recipientId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: snowflake.generate(),
        chatId: chatId,
        userId: currentUserId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await this.db
      .insert(messagesTable)
      .values({
        id: snowflake.generate(),
        chatId: chat.id,
        senderId: currentUserId,
        message,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();
  }

  async getAllChats(currentUserId: bigint) {
    const chats = await this.db.query.chatsTable.findMany({
      with: {
        participants: true,
        messages: true,
      },
    });
    return chats;
  }
}
