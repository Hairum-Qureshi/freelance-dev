import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { AuthRequest } from '@repo/shared-types';

export const CurrentUser = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request: AuthRequest = ctx.switchToHttp().getRequest();
    return request.user ?? null;
  },
);
