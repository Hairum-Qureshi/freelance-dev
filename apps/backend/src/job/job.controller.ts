import { Controller, Post, Body, UseGuards } from '@nestjs/common';
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
    return this.jobService.createJob(jobPostingDTO, currentUser.id);
  }
}
