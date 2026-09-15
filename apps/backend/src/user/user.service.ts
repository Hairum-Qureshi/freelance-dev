import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import type ImageKit from 'imagekit';
import { OnboardingDTO } from 'src/DTOs/onboarding.dto';
import { eq } from 'drizzle-orm';
import { usersTable } from 'src/schema';
import type { Database } from 'src/providers/postgres-db';

@Injectable()
export class UserService {
  constructor(
    @Inject('NeonDBProvider') private db: Database,
    @Inject('ImageKitProvider') private readonly imageKit: ImageKit,
  ) {}

  async submitOnboardingAnswers(userID: string, onboardingData: OnboardingDTO) {
    await this.db
      .update(usersTable)
      .set({
        onboarding_answers: onboardingData,
        completed_onboarding: true,
      })
      .where(eq(usersTable.id, Number(userID)));
  }

  async attachResume(userID: string, resume: Express.Multer.File) {
    if (!resume)
      throw new HttpException(
        'No resume file provided',
        HttpStatus.BAD_REQUEST,
      );

    const resumeExists = await this.db
      .select({ resume_url: usersTable.resume_url })
      .from(usersTable)
      .where(eq(usersTable.id, Number(userID)))
      .limit(1);

    if (resumeExists[0]?.resume_url)
      throw new HttpException('Resume already exists', HttpStatus.BAD_REQUEST);

    const resumeData = await this.imageKit.upload({
      file: resume.buffer,
      folder: `/profiles/${userID}`,
      fileName: 'Resume.pdf',
    });

    if (!resumeData)
      throw new HttpException(
        'Failed to upload resume',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

    await this.db
      .update(usersTable)
      .set({
        resume_url: resumeData.url,
      })
      .where(eq(usersTable.id, Number(userID)));
  }
}
