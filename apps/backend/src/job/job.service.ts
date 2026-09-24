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

    await this.db.insert(jobPostsTable).values({
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
    } as typeof jobPostsTable.$inferInsert);
  }
}
