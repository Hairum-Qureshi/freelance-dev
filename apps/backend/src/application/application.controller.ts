import { Controller, Body, UseGuards, Get, Param, Patch } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApplicationService } from './application.service';
import { CurrentUser } from 'src/decorators/currentUser.decorator';
import type { UserPayload } from '@repo/shared-types';

@Controller('application')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Get('all')
  @UseGuards(AuthGuard())
  async getAllSubmittedApplications(@CurrentUser() currentUser: UserPayload) {
    return this.applicationService.viewAllUserApplications({
      currentUserId: currentUser.id,
    });
  }

  @Get('all/applied')
  @UseGuards(AuthGuard())
  async getAllCurrentUserApplications(@CurrentUser() currentUser: UserPayload) {
    return this.applicationService.getAllSubmittedApplications(currentUser.id);
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

  @Patch(':applicationId/withdraw')
  @UseGuards(AuthGuard())
  async withdrawApplication(
    @Param('applicationId') applicationId: string,
    @CurrentUser() currentUser: UserPayload,
  ) {
    return this.applicationService.withdrawApplication(
      applicationId,
      currentUser.id,
    );
  }
}
