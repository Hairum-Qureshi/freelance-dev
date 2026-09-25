import { Injectable, Inject, HttpStatus, HttpException } from '@nestjs/common';
import { Database } from 'src/providers/postgres-db';
import { applicationsTable } from 'src/schema';
import SnowflakeId from 'snowflake-id';
import { JobPostingDTO } from 'src/DTOs/job.dto';
import { jobPostsTable } from 'src/schema';

@Injectable()
export class JobService {
  constructor(@Inject('NeonDBProvider') private readonly db: Database) {}

  async createJob(jobPosting: JobPostingDTO, posterId: string) {
    const snowflake = new SnowflakeId({
      mid: 42,
      offset: (2019 - 1970) * 31536000 * 1000,
    });

    const {
      jobTitle,
      businessName,
      projectType,
      lookingFor,
      experienceLevel,
      jobType,
      paymentType,
      workLocation,
      region,
      timeline,
      projectDetails,
      deliverables,
      salaryMin,
      salaryMax,
      skills,
    } = jobPosting;

    const [jobListing] = await this.db
      .insert(jobPostsTable)
      .values({
        id: snowflake.generate().toString(),
        jobTitle,
        businessName,
        projectType,
        lookingFor,
        experienceLevel,
        jobType,
        paymentType,
        workLocation,
        region,
        timeline,
        projectDetails,
        deliverables,
        salaryMin,
        salaryMax,
        skills,
        posterId,
      })
      .returning();

    return { jobID: jobListing.id };
  }

  async getAllJobs() {
    return this.db.query.jobPostsTable.findMany({
      with: {
        poster: {
          columns: {
            id: true,
            firstName: true,
            lastName: true,
            profilePicture: true,
            email: true,
          },
        },
      },
    });
  }

  async getJobData(jobId: string) {
    return this.db.query.jobPostsTable.findFirst({
      where: (jobPosts, { eq }) => eq(jobPosts.id, jobId),
      with: {
        poster: {
          columns: {
            id: true,
            firstName: true,
            lastName: true,
            profilePicture: true,
            email: true,
          },
        },
      },
    });
  }

  async applyToJob(jobId: string, currUserId: string, proposal: string) {
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

    const [application] = await this.db
      .insert(applicationsTable)
      .values({
        id: snowflake.generate().toString(),
        jobId,
        applicantId: currUserId,
        proposal,
      })
      .returning();

    return { applicationId: application.id };
  }
}
