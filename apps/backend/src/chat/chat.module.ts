import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { NeonDBProvider } from 'src/providers/postgres-db';

@Module({
  providers: [ChatService, NeonDBProvider],
  controllers: [ChatController],
})
export class ChatModule {}
