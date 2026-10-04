import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
  Injectable,
} from '@nestjs/common';
import type { UserRole, UserPayload } from '@repo/shared-types';
import { Reflector } from '@nestjs/core';
import { Roles } from 'src/decorators/roles.decorator';

@Injectable()
export class HasRolePermissions implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const user: UserPayload = context.switchToHttp().getRequest().user;

    if (!user) {
      throw new UnauthorizedException('Please log in first');
    }

    const roles = this.reflector.get<UserRole[]>(Roles, context.getHandler());

    if (!roles?.length) {
      return true;
    }

    if (!roles.includes(user.role as UserRole)) {
      throw new ForbiddenException(
        'You do not have permission to perform this action',
      );
    }

    return true;
  }
}
