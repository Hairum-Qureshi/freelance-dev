import {
  Controller,
  Post,
  UseGuards,
  Body,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateChatDTO } from '../DTOs/chat.dto';
import { ChatService } from './chat.service';
import { CurrentUser } from 'src/decorators/currentUser.decorator';
import type { UserPayload } from '@repo/shared-types';
import { BigIntInterceptor } from 'src/interceptors/bigint.interceptor';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('create')
  @UseGuards(AuthGuard())
  createChat(
    @Body() createChatDTO: CreateChatDTO,
    @CurrentUser() currentUser: UserPayload,
  ) {
    return this.chatService.createChat(createChatDTO, BigInt(currentUser.id));
  }

  @Get('all')
  @UseInterceptors(BigIntInterceptor)
  @UseGuards(AuthGuard())
  getAllChats(@CurrentUser() currentUser: UserPayload) {
    return this.chatService.getAllChats(BigInt(currentUser.id));
  }
}
