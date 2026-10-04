import { Controller, Body, UseGuards, Get, Param, Patch } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IsOwnerGuard } from 'src/guards/isOwner.guard';
import { ApplicationService } from './application.service';
import { CurrentUser } from 'src/decorators/currentUser.decorator';
import type { UserPayload } from '@repo/shared-types';
import { Roles } from 'src/decorators/roles.decorator';
import { HasRolePermissions } from 'src/guards/isAuthorized.guard';
import { UpdateApplicationStatusDTO } from 'src/DTOs/update-application-status.dto';

@Controller('application')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Get('all')
  @UseGuards(AuthGuard(), HasRolePermissions)
  @Roles(['client'])
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
  @UseGuards(AuthGuard(), IsOwnerGuard(false), HasRolePermissions)
  @Roles(['client'])
  async updateApplicationStatus(
    @Param('applicationId') applicationId: string,
    @Body() updateStatusDto: UpdateApplicationStatusDTO,
  ) {
    return this.applicationService.updateApplicationStatus(
      applicationId,
      updateStatusDto,
    );
  }

  @Patch(':applicationId/set-payment-price')
  @UseGuards(AuthGuard(), IsOwnerGuard(false), HasRolePermissions)
  @Roles(['client'])
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
  @UseGuards(AuthGuard(), IsOwnerGuard(true))
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
