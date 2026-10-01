import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Param,
  Patch,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JobPostingDTO } from 'src/DTOs/job.dto';
import { JobService } from './job.service';
import { CurrentUser } from 'src/decorators/currentUser.decorator';
import type { UserPayload } from '@repo/shared-types';

@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Post('create')
  @UseGuards(AuthGuard())
  async createJob(
    @Body() jobPostingDTO: JobPostingDTO,
    @CurrentUser() currentUser: UserPayload,
  ) {
    // TODO - add guard to prevent only users with a hirer role to create job postings
    return this.jobService.createJob(jobPostingDTO, currentUser.id);
  }

  @Get('all')
  @UseGuards(AuthGuard())
  async getAllJobs() {
    return this.jobService.getAllJobs();
  }

  @Get(':jobId')
  @UseGuards(AuthGuard())
  async getJobById(@Param('jobId') jobId: string) {
    return this.jobService.getJobData(jobId);
  }

  @Post(':jobId/apply')
  @UseGuards(AuthGuard())
  async applyToJob(
    @Param('jobId') jobId: string,
    @CurrentUser() currentUser: UserPayload,
    @Body('proposal') proposal: string,
    @Body('posterId') posterId: string,
  ) {
    return this.jobService.applyToJob(
      jobId,
      currentUser.id,
      proposal,
      posterId,
    );
  }

  @Post(':jobId/add-review')
  @UseGuards(AuthGuard())
  async leaveReview(
    @Param('jobId') jobId: string,
    @CurrentUser() currentUser: UserPayload,
    @Body('rating') rating: number,
    @Body('title') title: string,
    @Body('review') review: string,
  ) {
    return this.jobService.leaveReview(
      jobId,
      currentUser.id,
      rating,
      title,
      review,
    );
  }

  @Get(':jobId/reviews')
  @UseGuards(AuthGuard())
  async getJobReviews(@Param('jobId') jobId: string) {
    return this.jobService.getJobReviews(jobId);
  }

  @Patch(':jobId/edit-review')
  @UseGuards(AuthGuard())
  async editReview(
    @Param('jobId') jobId: string,
    @CurrentUser() currentUser: UserPayload,
    @Body('rating') rating: number,
    @Body('title') title: string,
    @Body('review') review: string,
  ) {
    return this.jobService.editExistingReview(
      jobId,
      currentUser.id,
      rating,
      title,
      review,
    );
  }
}
