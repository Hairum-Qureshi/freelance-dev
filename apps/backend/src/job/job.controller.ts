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

  @Get('applications/all')
  @UseGuards(AuthGuard())
  async getAllSubmittedApplications(@CurrentUser() currentUser: UserPayload) {
    return this.jobService.viewAllUserApplications({
      currentUserId: currentUser.id,
    });
  }

  @Patch('application/:applicationId/update-status')
  @UseGuards(AuthGuard())
  async updateApplicationStatus(
    @Param('applicationId') applicationId: string,
    @Body('status') status: 'accepted' | 'rejected' | 'pending',
    @Body('applicantName') applicantName: string,
    @Body('applicantEmail') applicantEmail: string,
    @Body('jobTitle') jobTitle: string,
  ) {
    return this.jobService.updateApplicationStatus(
      applicationId,
      status,
      applicantName,
      applicantEmail,
      jobTitle,
    );
  }

  @Get('applications/:jobId')
  @UseGuards(AuthGuard())
  async getApplicationsForJob(@Param('jobId') jobId: string) {
    // return this.jobService.getApplicationsForJob(jobId);
  }
}
