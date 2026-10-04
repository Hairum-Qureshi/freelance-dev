import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type { UserPayload } from '@repo/shared-types';
import { Database } from 'src/providers/postgres-db';

@Injectable()
export class IsMemberGuard implements CanActivate {
  constructor(
    @Inject('NeonDBProvider')
    readonly db: Database,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const chatId: string | undefined = context.switchToHttp().getRequest()
      .params.chatId;
    const user: UserPayload = context.switchToHttp().getRequest().user;

    if (!chatId) throw new NotFoundException('Chat not found');

    if (!user) throw new ForbiddenException('User not authenticated');

    const chat = await this.db.query.chatsTable.findFirst({
      where: (chats, { eq }) => eq(chats.id, chatId),
      with: { participants: true },
    });

    if (!chat) throw new NotFoundException('Chat not found');

    const isMember = chat.participants.some(
      (participant) => participant.userId === user.id,
    );

    if (!isMember)
      throw new ForbiddenException('User is not a member of this chat');

    return true;
  }
}
