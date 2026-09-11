import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CurrentUser } from 'src/decorators/currentUser.decorator';
import type { UserPayload } from 'src/types';
import { OnboardingDTO } from 'src/DTOs/onboarding.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('onboarding/answers')
  @UseGuards(AuthGuard())
  submitOnboardingAnswers(
    @CurrentUser() currentUser: UserPayload,
    @Body() onboardingData: OnboardingDTO,
  ) {
    return this.userService.submitOnboardingAnswers(
      currentUser.id,
      onboardingData,
    );
  }
}
