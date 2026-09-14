import { neon } from '@neondatabase/serverless';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import type ImageKit from 'imagekit';
import { OnboardingDTO } from 'src/DTOs/onboarding.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('NeonDBProvider') private sql: ReturnType<typeof neon>,
    @Inject('ImageKitProvider') private readonly imageKit: ImageKit,
  ) {}

  async submitOnboardingAnswers(userID: string, onboardingData: OnboardingDTO) {
    await this
      .sql`UPDATE users SET "onboardingAnswers" = ${onboardingData}, "completedOnboarding" = true WHERE id = ${userID}`;
  }

  async attachResume(userID: string, resume: Express.Multer.File) {
    const resumeData = await this.imageKit.upload({
      file: resume.buffer,
      folder: `/profiles/${userID}`,
      fileName: resume.originalname,
    });

    if (!resumeData)
      throw new HttpException(
        'Failed to upload resume',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

    await this
      .sql`UPDATE users SET resume_url = ${resumeData.url} WHERE id = ${userID}`;
  }
}
