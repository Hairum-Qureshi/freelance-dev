import { Injectable } from '@nestjs/common';
import type { Database } from 'src/providers/postgres-db';
import { Inject, HttpException } from '@nestjs/common';
import type { CreateChatDTO } from '../DTOs/chat.dto';
import { chatsTable, messagesTable } from 'src/schema';
import SnowflakeId from 'snowflake-id';
import { eq } from 'drizzle-orm';

@Injectable()
export class ChatService {
  constructor(@Inject('NeonDBProvider') private readonly db: Database) {}

  async createChat(createChatDTO: CreateChatDTO, currentUserId: bigint) {
    const { chatID, to, message } = createChatDTO;
    const chatId = BigInt(chatID);
    const recipientId = BigInt(to);

    const [existingChat] = await this.db
      .select()
      .from(chatsTable)
      .where(eq(chatsTable.participants, [1n, currentUserId, recipientId]))
      .limit(1);

    if (existingChat) throw new HttpException('Chat already exists', 400);

    const snowflake = new SnowflakeId({
      mid: 42,
      offset: (2019 - 1970) * 31536000 * 1000,
    });

    const [chat] = await this.db
      .insert(chatsTable)
      .values({
        id: chatId,
        participants: [1n, currentUserId, recipientId],
        created_at: new Date(),
        updated_at: new Date(),
      })
      .returning();

    await this.db
      .insert(messagesTable)
      .values({
        id: snowflake.generate(),
        chat_id: chat.id,
        sender_id: currentUserId,
        message,
        created_at: new Date(),
        updated_at: new Date(),
      })
      .returning();
  }
}
