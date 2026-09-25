import { Injectable, Inject } from '@nestjs/common';
import { Database } from 'src/providers/postgres-db';
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
      budgetMin,
      budgetMax,
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
        budgetMin,
        budgetMax,
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
}
