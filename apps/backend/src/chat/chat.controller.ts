import { Controller, Post, UseGuards, Body, Get } from '@nestjs/common';
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
  createChat(
    @Body() createChatDTO: CreateChatDTO,
    @CurrentUser() currentUser: UserPayload,
  ) {
    return this.chatService.createChat(createChatDTO, currentUser.id);
  }

  @Get('all')
  @UseGuards(AuthGuard())
  getAllChats(@CurrentUser() currentUser: UserPayload) {
    return this.chatService.getAllChats(currentUser.id);
  }
}
