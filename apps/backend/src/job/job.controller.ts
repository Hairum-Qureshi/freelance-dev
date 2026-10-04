import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JobPostingDTO } from 'src/DTOs/job.dto';
import { ReviewDTO } from 'src/DTOs/review.dto';
import { JobService } from './job.service';
import { CurrentUser } from 'src/decorators/currentUser.decorator';
import type { UserPayload } from '@repo/shared-types';
import { HasRolePermissions } from 'src/guards/isAuthorized.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { IsOwnerGuard } from 'src/guards/isOwner.guard';

@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Post('create')
  @UseGuards(AuthGuard(), HasRolePermissions)
  @Roles(['client'])
  async createJob(
    @Body() jobPostingDTO: JobPostingDTO,
    @CurrentUser() currentUser: UserPayload,
  ) {
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
    @Body() reviewDTO: ReviewDTO,
  ) {
    return this.jobService.leaveReview(
      jobId,
      currentUser.id,
      reviewDTO,
      currentUser.role as 'client' | 'freelancer',
    );
  }

  @Post(':jobId/review-freelancer')
  @Roles(['client'])
  @UseGuards(AuthGuard(), HasRolePermissions)
  async reviewFreelancer(
    @Param('jobId') jobId: string,
    @CurrentUser() currentUser: UserPayload,
    @Body('review') review: string,
  ) {
    return this.jobService.addFreelancerReview(jobId, currentUser.id, review);
  }

  @Get(':jobId/reviews')
  @UseGuards(AuthGuard())
  async getJobReviews(@Param('jobId') jobId: string) {
    return this.jobService.getJobReviews(jobId);
  }

  @Get('/reviews/about/:userId')
  @UseGuards(AuthGuard())
  async getReviewsAboutMe(@Param('userId') userId: string) {
    return this.jobService.reviewsAboutMe(userId);
  }

  @Patch(':jobId/edit-review')
  @Roles(['freelancer'])
  @UseGuards(AuthGuard(), IsOwnerGuard(true), HasRolePermissions)
  async editReview(
    @Param('jobId') jobId: string,
    @CurrentUser() currentUser: UserPayload,
    @Body() reviewDTO: ReviewDTO,
  ) {
    return this.jobService.editExistingReview(jobId, currentUser.id, reviewDTO);
  }

  @Delete(':jobId/delete-review')
  @UseGuards(AuthGuard(), IsOwnerGuard(true), HasRolePermissions)
  @Roles(['freelancer'])
  async deleteReview(
    @Param('jobId') jobId: string,
    @CurrentUser() currentUser: UserPayload,
  ) {
    return this.jobService.deleteReview(jobId, currentUser.id);
  }
}
