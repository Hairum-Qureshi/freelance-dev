import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import type ImageKit from 'imagekit';
import { OnboardingDTO } from 'src/DTOs/onboarding.dto';
import { eq } from 'drizzle-orm';
import { usersTable } from 'src/schema';
import type { Database } from 'src/providers/postgres-db';
import type { UserPayload } from '@repo/shared-types';

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
        onboardingAnswers: onboardingData,
        completedOnboarding: true,
      })
      .where(eq(usersTable.id, userID));
  }

  async attachResume(userID: string, resume: Express.Multer.File) {
    if (!resume)
      throw new HttpException(
        'No resume file provided',
        HttpStatus.BAD_REQUEST,
      );

    const resumeExists = await this.db
      .select({ resumeId: usersTable.resumeId })
      .from(usersTable)
      .where(eq(usersTable.id, userID))
      .limit(1);

    if (resumeExists[0]?.resumeId)
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
        resumeId: resumeData.fileId,
      })
      .where(eq(usersTable.id, userID));
  }

  async removeResume(userID: string) {
    const [resumeExists] = await this.db
      .select({ resumeId: usersTable.resumeId })
      .from(usersTable)
      .where(eq(usersTable.id, userID));

    if (!resumeExists?.resumeId)
      throw new HttpException('No resume to remove', HttpStatus.NOT_FOUND);

    await this.imageKit.deleteFile(resumeExists.resumeId);

    await this.db
      .update(usersTable)
      .set({
        resumeId: null,
      })
      .where(eq(usersTable.id, userID));

    return { success: true };
  }

  async getUserProfile(userId: string) {
    const [user] = await this.db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, userId))
      .limit(1);

    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    const userPayload: UserPayload = {
      id: String(user.id),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      profilePicture: user.profilePicture,
      completedOnboarding: user.completedOnboarding ?? false,
      onboardingAnswers: user.onboardingAnswers,
      resumeId: user.resumeId,
      location: user.location,
      deleted: user.deleted ?? false,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    return userPayload;
  }
}
