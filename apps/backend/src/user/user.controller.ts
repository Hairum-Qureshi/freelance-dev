import {
  Body,
  UploadedFile,
  Controller,
  Post,
  UseGuards,
  Patch,
  UseInterceptors,
  Delete,
  Get,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CurrentUser } from 'src/decorators/currentUser.decorator';
import type { UserPayload } from '@repo/shared-types';
import { OnboardingDTO } from 'src/DTOs/onboarding.dto';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { Param } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:userId/profile')
  @UseGuards(AuthGuard())
  getUserProfile(@Param('userId') userId: string) {
    return this.userService.getUserProfile(BigInt(userId));
  }

  @Post('onboarding/answers')
  @UseGuards(AuthGuard())
  submitOnboardingAnswers(
    @CurrentUser() currentUser: UserPayload,
    @Body() onboardingData: OnboardingDTO,
  ) {
    return this.userService.submitOnboardingAnswers(
      BigInt(currentUser.id),
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
    return this.userService.attachResume(BigInt(currentUser.id), resume);
  }

  @Delete('/remove-resume')
  @UseGuards(AuthGuard())
  removeResume(@CurrentUser() currentUser: UserPayload) {
    return this.userService.removeResume(BigInt(currentUser.id));
  }
}
