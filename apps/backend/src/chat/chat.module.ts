import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { NeonDBProvider } from 'src/providers/postgres-db';
import { ImageKitProvider } from 'src/providers/imagekit';
import { EmailModule } from 'src/email/email.module';

@Module({
  providers: [ChatService, NeonDBProvider, ImageKitProvider],
  controllers: [ChatController],
  imports: [EmailModule],
})
export class ChatModule {}
