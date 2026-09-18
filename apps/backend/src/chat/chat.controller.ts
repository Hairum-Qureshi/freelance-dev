import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateChatDTO } from '../DTOs/chat.dto';
import { ChatService } from './chat.service';
import { CurrentUser } from 'src/decorators/currentUser.decorator';
import type { UserPayload } from '@repo/shared-types';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('create')
  @UseGuards(AuthGuard())
  // TODO - need to add a role guard that ensures only hirers can create a chat with potential clients
  createChat(
    @Body() createChatDTO: CreateChatDTO,
    @CurrentUser() currentUser: UserPayload,
  ) {
    return this.chatService.createChat(createChatDTO, BigInt(currentUser.id));
  }
}
