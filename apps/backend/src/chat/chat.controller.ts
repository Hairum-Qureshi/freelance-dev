import { Controller, Post, UseGuards, Body, Get, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateChatDTO } from '../DTOs/chat.dto';
import { ChatService } from './chat.service';
import { CurrentUser } from 'src/decorators/currentUser.decorator';
import type { UserPayload } from '@repo/shared-types';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UseInterceptors } from '@nestjs/common';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  // TODO - need to block users from sending/starting a chat with the ADMIN user

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

  @Get(':chatId')
  @UseGuards(AuthGuard())
  getChatById(@Param('chatId') chatId: string) {
    // TODO - will need to create a guard checking if the user is even in this chat
    return this.chatService.getChatById(chatId);
  }

  @Post(':chatId/message')
  @UseGuards(AuthGuard())
  @UseInterceptors(FilesInterceptor('attachments', 5))
  addMessage(
    @CurrentUser() currentUser: UserPayload,
    @Param('chatId') chatId: string,
    @Body('message') message: string,
    @Body('attachments') attachments?: Express.Multer.File[],
  ) {
    return this.chatService.addMessage(
      chatId,
      currentUser.id,
      message,
      attachments,
    );
  }
}
