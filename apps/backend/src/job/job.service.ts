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
import { ReviewDTO } from 'src/DTOs/review.dto';
import { jobPostsTable, ratingsTable } from 'src/schema';
import { applicationsTable } from 'src/schema';
import { eq } from 'drizzle-orm/sql/expressions/conditions';

@Injectable()
export class JobService {
  constructor(@Inject('NeonDBProvider') private readonly db: Database) {}

  private generateSnowflakeId(): string {
    return new SnowflakeId({
      mid: 42,
      offset: (2019 - 1970) * 31536000 * 1000,
    }).toString();
  }

  async createJob(jobPosting: JobPostingDTO, posterId: string) {
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
        id: this.generateSnowflakeId(),
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
      id: this.generateSnowflakeId(),
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

  async leaveReview(jobId: string, currUserId: string, reviewDTO: ReviewDTO) {
    const { rating, title, review } = reviewDTO;

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
      id: this.generateSnowflakeId(),
      jobId,
      posterId: currUserId,
      jobPosterId: job.posterId,
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

  async editExistingReview(
    jobId: string,
    currUserId: string,
    reviewDTO: ReviewDTO,
  ) {
    const existingReview = await this.db.query.ratingsTable.findFirst({
      where: (ratings, { eq }) =>
        eq(ratings.jobId, jobId) && eq(ratings.posterId, currUserId),
    });

    if (!existingReview) {
      throw new NotFoundException('Review not found');
    }

    const { rating, title, review } = reviewDTO;

    await this.db
      .update(ratingsTable)
      .set({
        rating: rating.toString(),
        title: title.trim(),
        review,
        updatedAt: new Date(),
      })
      .where(
        eq(ratingsTable.jobId, jobId) && eq(ratingsTable.posterId, currUserId),
      );
  }

  async deleteReview(jobId: string, currUserId: string) {
    const existingReview = await this.db.query.ratingsTable.findFirst({
      where: (ratings, { eq }) =>
        eq(ratings.jobId, jobId) && eq(ratings.posterId, currUserId),
    });

    if (!existingReview) {
      throw new NotFoundException('Review not found');
    }

    await this.db
      .delete(ratingsTable)
      .where(
        eq(ratingsTable.jobId, jobId) && eq(ratingsTable.posterId, currUserId),
      );
  }

  async reviewsAboutMe(userId: string) {
    const user = await this.db.query.usersTable.findFirst({
      where: (users, { eq }) => eq(users.id, userId),
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const reviews = await this.db.query.ratingsTable.findMany({
      where: (ratings, { eq }) => eq(ratings.jobPosterId, userId),
      columns: {
        id: true,
        posterId: true,
        jobPosterId: true,
        title: true,
        review: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return reviews;
  }

  async addClientReview(jobId: string, currUserId: string, review: string) {
    const job = await this.db.query.jobPostsTable.findFirst({
      where: (jobPosts, { eq }) => eq(jobPosts.id, jobId),
    });

    if (!job) throw new NotFoundException('Job not found');

    return await this.db.insert(ratingsTable).values({
      id: this.generateSnowflakeId(),
      jobId,
      posterId: currUserId,
      jobPosterId: job.posterId,
      rating: '0',
      title: 'Client Review',
      review,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}
