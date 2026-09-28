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
import { ApplicationService } from './application.service';
import { CurrentUser } from 'src/decorators/currentUser.decorator';
import type { UserPayload } from '@repo/shared-types';

@Controller('application')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Post(':jobId/apply')
  @UseGuards(AuthGuard())
  async applyToJob(
    @Param('jobId') jobId: string,
    @CurrentUser() currentUser: UserPayload,
    @Body('proposal') proposal: string,
    @Body('posterId') posterId: string,
  ) {
    return this.applicationService.applyToJob(
      jobId,
      currentUser.id,
      proposal,
      posterId,
    );
  }

  @Get('all')
  @UseGuards(AuthGuard())
  async getAllSubmittedApplications(@CurrentUser() currentUser: UserPayload) {
    return this.applicationService.viewAllUserApplications({
      currentUserId: currentUser.id,
    });
  }

  @Patch(':applicationId/update-status')
  @UseGuards(AuthGuard())
  async updateApplicationStatus(
    @Param('applicationId') applicationId: string,
    @Body('status') status: 'accepted' | 'rejected' | 'pending',
    @Body('applicantName') applicantName: string,
    @Body('applicantEmail') applicantEmail: string,
    @Body('jobTitle') jobTitle: string,
    @Body('jobId') jobId: string,
  ) {
    return this.applicationService.updateApplicationStatus(
      applicationId,
      status,
      applicantName,
      applicantEmail,
      jobTitle,
      jobId,
    );
  }

  @Patch(':applicationId/set-payment-price')
  @UseGuards(AuthGuard())
  async setPaymentPrice(
    @Param('applicationId') applicationId: string,
    @Body('paymentPrice') paymentPrice: number,
    @CurrentUser() currentUser: UserPayload,
  ) {
    return this.applicationService.setPaymentPrice(
      applicationId,
      paymentPrice,
      currentUser.firstName,
    );
  }
}
