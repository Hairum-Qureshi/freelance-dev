import {
  Body,
  UploadedFile,
  Controller,
  Post,
  UseGuards,
  Patch,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CurrentUser } from 'src/decorators/currentUser.decorator';
import type { UserPayload } from 'src/types';
import { OnboardingDTO } from 'src/DTOs/onboarding.dto';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';

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

  @Patch('/attach-resume')
  @UseGuards(AuthGuard())
  @UseInterceptors(FileInterceptor('resume'))
  attachResume(
    @CurrentUser() currentUser: UserPayload,
    @UploadedFile() resume: Express.Multer.File,
  ) {
    return this.userService.attachResume(currentUser.id, resume);
  }
}
