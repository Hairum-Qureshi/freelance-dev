import { Injectable, Inject, HttpStatus, HttpException } from '@nestjs/common';
import { EmailService } from 'src/email/email.service';
import { Database } from 'src/providers/postgres-db';
import { applicationsTable } from 'src/schema';
import SnowflakeId from 'snowflake-id';
import { jobPostsTable } from 'src/schema';
import { eq } from 'drizzle-orm';
import { NotFoundException } from '@nestjs/common';
import { ApplicationPayload } from '@repo/shared-types';

@Injectable()
export class ApplicationService {
  constructor(
    @Inject('NeonDBProvider') private readonly db: Database,
    private readonly emailService: EmailService,
  ) {}

  async applyToJob(
    jobId: string,
    currUserId: string,
    proposal: string,
    posterId: string,
  ) {
    const snowflake = new SnowflakeId({
      mid: 42,
      offset: (2019 - 1970) * 31536000 * 1000,
    });

    if (!proposal.trim()) {
      throw new HttpException(
        'Proposal cannot be empty',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (proposal.length < 20 || proposal.length > 600) {
      throw new HttpException(
        'Proposal must be between 20 and 600 characters',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.db.insert(applicationsTable).values({
      id: snowflake.generate().toString(),
      jobId,
      applicantId: currUserId,
      posterId,
      proposal,
    });
  }

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
    status: 'accepted' | 'rejected' | 'pending',
    applicantName: string,
    applicantEmail: string,
    jobTitle: string,
    jobId: string,
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
}
