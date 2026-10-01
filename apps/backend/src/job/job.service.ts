import {
  Injectable,
  Inject,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { Database } from 'src/providers/postgres-db';
import SnowflakeId from 'snowflake-id';
import { JobPostingDTO } from 'src/DTOs/job.dto';
import { jobPostsTable, ratingsTable } from 'src/schema';
import { applicationsTable } from 'src/schema';

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
            resumeId: true,
          },
        },
      },
    });
  }

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

  async leaveReview(
    jobId: string,
    currUserId: string,
    rating: number,
    title: string,
    review: string,
  ) {
    const snowflake = new SnowflakeId({
      mid: 42,
      offset: (2019 - 1970) * 31536000 * 1000,
    });

    if (rating < 1 || rating > 5) {
      throw new HttpException(
        'Rating must be between 1 and 5',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!title || !title.trim()) {
      throw new HttpException('Title cannot be empty', HttpStatus.BAD_REQUEST);
    }

    if (title.length > 100) {
      throw new HttpException(
        'Title cannot exceed 100 characters',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!review || !review.trim()) {
      throw new HttpException('Review cannot be empty', HttpStatus.BAD_REQUEST);
    }

    if (review.length > 600) {
      throw new HttpException(
        'Review cannot exceed 600 characters',
        HttpStatus.BAD_REQUEST,
      );
    }

    const application = await this.db.query.applicationsTable.findFirst({
      where: (applications, { eq }) =>
        eq(applications.jobId, jobId) &&
        eq(applications.applicantId, currUserId),
    });

    if (!application) {
      throw new HttpException(
        'You can only leave a review for a job you were hired for',
        HttpStatus.BAD_REQUEST,
      );
    }

    const job = await this.db.query.jobPostsTable.findFirst({
      where: (jobPosts, { eq }) => eq(jobPosts.id, jobId),
    });

    if (!job) throw new NotFoundException('Job not found');

    if (job.posterId === currUserId) {
      throw new HttpException(
        'You cannot leave a review for your own job posting',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hasReviewed = await this.db.query.ratingsTable.findFirst({
      where: (ratings, { eq }) =>
        eq(ratings.jobId, jobId) && eq(ratings.posterId, currUserId),
    });

    if (hasReviewed) {
      throw new HttpException(
        'You have already reviewed this job',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.db.insert(ratingsTable).values({
      id: snowflake.generate().toString(),
      jobId,
      posterId: currUserId,
      rating: rating.toString(),
      title: title.trim(),
      review,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  async getJobReviews(jobId: string) {
    const jobRatings = await this.db.query.ratingsTable.findMany({
      where: (ratings, { eq }) => eq(ratings.jobId, jobId),
      with: {
        poster: {
          columns: {
            id: true,
            firstName: true,
            lastName: true,
            profilePicture: true,
          },
        },
      },
    });

    return !jobRatings
      ? {
          average: 0,
          ratings: [],
        }
      : {
          average:
            jobRatings
              .map((r) => parseFloat(r.rating))
              .reduce((a, b) => a + b, 0) / jobRatings.length,
          ratings: jobRatings,
        };
  }
}
