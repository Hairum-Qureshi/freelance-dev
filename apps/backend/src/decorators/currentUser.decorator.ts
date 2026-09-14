import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthRequest } from 'src/types';

export const CurrentUser = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request: AuthRequest = ctx.switchToHttp().getRequest();
    const user = request.user;
    if (!user) return null;

    const userPayload = {
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      profilePicture: user.profile_picture,
      onboardingAnswers: user.onboarding_answers,
      completedOnboarding: user.completed_onboarding,
      deleted: user.deleted,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
    };
    return userPayload;
  },
);
