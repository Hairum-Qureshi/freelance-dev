import { Injectable, Inject, HttpStatus, HttpException } from '@nestjs/common';
import { EmailService } from 'src/email/email.service';
import { Database } from 'src/providers/postgres-db';
import { applicationsTable } from 'src/schema';
import { jobPostsTable } from 'src/schema';
import { eq } from 'drizzle-orm';
import { NotFoundException } from '@nestjs/common';
import { ApplicationPayload } from '@repo/shared-types';
import type { UpdateApplicationStatusDTO } from 'src/DTOs/update-application-status.dto';

@Injectable()
export class ApplicationService {
  constructor(
    @Inject('NeonDBProvider') private readonly db: Database,
    private readonly emailService: EmailService,
  ) {}

  async viewAllUserApplications({ currentUserId }: { currentUserId: string }) {
    return this.db.query.applicationsTable.findMany({
      where: (applications, { eq }) => eq(applications.posterId, currentUserId),
      with: {
        applicant: {
          columns: {
            id: true,
            firstName: true,
            lastName: true,
            profilePicture: true,
            email: true,
            resumeId: true,
          },
        },
        job: true,
      },
      orderBy: (applications, { desc }) => desc(applications.createdAt),
    });
  }

  async updateApplicationStatus(
    applicationId: string,
    {
      status,
      applicantName,
      applicantEmail,
      jobTitle,
      jobId,
    }: UpdateApplicationStatusDTO,
  ) {
    await this.db
      .update(applicationsTable)
      .set({ status })
      .where(eq(applicationsTable.id, applicationId));

    await this.emailService.sendApplicationStatusEmail(
      applicantEmail,
      applicantName,
      status,
      jobTitle,
      jobId,
    );
  }

  async setPaymentPrice(
    applicationId: string,
    paymentPrice: number,
    currUserName: string,
  ) {
    if (paymentPrice === 0)
      throw new HttpException(
        'Payment price cannot be zero',
        HttpStatus.BAD_REQUEST,
      );

    const application = (await this.db.query.applicationsTable.findFirst({
      where: (applicationsTable, { eq }) =>
        eq(applicationsTable.id, applicationId),
      with: {
        job: true,
        applicant: true,
      },
    })) as ApplicationPayload;

    if (!application) {
      throw new NotFoundException('Application not found');
    }

    if (application.status !== 'accepted')
      throw new HttpException(
        'Payment price can only be set for accepted applications',
        HttpStatus.BAD_REQUEST,
      );

    if (paymentPrice < application.job.salaryMin)
      throw new HttpException(
        `Payment price cannot be less than the minimum salary of ${application.job.salaryMin}`,
        HttpStatus.BAD_REQUEST,
      );

    if (paymentPrice > application.job.salaryMax)
      throw new HttpException(
        `Payment price cannot be greater than the maximum salary of ${application.job.salaryMax}`,
        HttpStatus.BAD_REQUEST,
      );

    await this.db
      .update(jobPostsTable)
      .set({ agreedPaymentRateCents: Math.floor(paymentPrice * 100) }) // convert payment to cents
      .where(eq(jobPostsTable.id, application.job.id));

    await this.emailService.sendPayRateEmail(
      application.applicant.email,
      currUserName,
      application.applicant.firstName,
      Math.floor(paymentPrice * 100),
    );
  }

  async getAllSubmittedApplications(currUserId: string) {
    return this.db.query.applicationsTable.findMany({
      where: (applicationsTable, { eq }) =>
        eq(applicationsTable.applicantId, currUserId),
      with: {
        job: true,
        applicant: {
          columns: {
            id: true,
            firstName: true,
            lastName: true,
            profilePicture: true,
            email: true,
            resumeId: true,
          },
        },
      },
      orderBy: (applications, { desc }) => desc(applications.createdAt),
    });
  }

  async withdrawApplication(applicationId: string, currUserId: string) {
    const application = await this.db.query.applicationsTable.findFirst({
      where: (applicationsTable, { eq }) =>
        eq(applicationsTable.id, applicationId),
    });

    if (!application) {
      throw new NotFoundException('Application not found');
    }

    // check if the application has already been accepted or rejected
    if (
      application.status === 'accepted' ||
      application.status === 'rejected'
    ) {
      throw new HttpException(
        'Cannot withdraw an application that has already been accepted or rejected. Contact the client for further assistance.',
        HttpStatus.BAD_REQUEST,
      );
    }

    // check if the current user is the applicant
    if (application.applicantId !== currUserId) {
      throw new HttpException(
        'You can only withdraw your own applications',
        HttpStatus.FORBIDDEN,
      );
    }

    await this.db
      .delete(applicationsTable)
      .where(eq(applicationsTable.id, applicationId));
  }
}
