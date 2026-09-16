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

  async submitOnboardingAnswers(userID: bigint, onboardingData: OnboardingDTO) {
    await this.db
      .update(usersTable)
      .set({
        onboarding_answers: onboardingData,
        completed_onboarding: true,
      })
      .where(eq(usersTable.id, userID));
  }

  async attachResume(userID: bigint, resume: Express.Multer.File) {
    if (!resume)
      throw new HttpException(
        'No resume file provided',
        HttpStatus.BAD_REQUEST,
      );

    const resumeExists = await this.db
      .select({ resume_id: usersTable.resume_id })
      .from(usersTable)
      .where(eq(usersTable.id, userID))
      .limit(1);

    if (resumeExists[0]?.resume_id)
      throw new HttpException('Resume already exists', HttpStatus.BAD_REQUEST);

    const resumeData = await this.imageKit.upload({
      file: resume.buffer,
      folder: `/profiles/${userID}`,
      fileName: 'Resume.pdf',
      useUniqueFileName: false,
    });

    if (!resumeData)
      throw new HttpException(
        'Failed to upload resume',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

    await this.db
      .update(usersTable)
      .set({
        resume_id: resumeData.fileId,
      })
      .where(eq(usersTable.id, userID));
  }

  async removeResume(userID: bigint) {
    const [resumeExists] = await this.db
      .select({ resume_id: usersTable.resume_id })
      .from(usersTable)
      .where(eq(usersTable.id, userID));

    if (!resumeExists?.resume_id)
      throw new HttpException('No resume to remove', HttpStatus.NOT_FOUND);

    await this.imageKit.deleteFile(resumeExists.resume_id);

    await this.db
      .update(usersTable)
      .set({
        resume_id: null,
      })
      .where(eq(usersTable.id, userID));

    return { success: true };
  }

  async getUserProfile(userId: bigint) {
    const [user] = await this.db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, userId))
      .limit(1);

    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    return {
      ...user,
      id: user.id.toString(), // need to convert 'id' to string because JSON doesn't support 'bigint'
    };
  }
}
