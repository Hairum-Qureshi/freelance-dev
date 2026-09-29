import {
  Controller,
  Post,
  UseGuards,
  Param,
  BadRequestException,
} from '@nestjs/common';
import { StripeService } from './stripe.service';
import { AuthGuard } from '@nestjs/passport';
import { Body } from '@nestjs/common';
import { CurrentUser } from 'src/decorators/currentUser.decorator';
import { UserPayload } from '@repo/shared-types';

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post('create-connected-account')
  @UseGuards(AuthGuard())
  createStripeConnectedAccount(@CurrentUser() user: UserPayload) {
    // TODO - add role guard to restrict only clients to this endpoint

    if (user.stripeAccountConnected) {
      throw new BadRequestException('Stripe account is already connected');
    }

    return this.stripeService.createConnectedAccount(
      user.id,
      user.email,
      `${user.firstName} ${user.lastName}`,
    );
  }

  @Post(':applicationId/create-payment-intent')
  @UseGuards(AuthGuard())
  createPaymentIntent(
    @CurrentUser() user: UserPayload,
    @Param('applicationId') applicationId: string,
    @Body('hiredUserId') hiredUserId: string,
  ) {
    // TODO - add role guard to restrict only clients to this endpoint
    return this.stripeService.createPaymentIntent(
      user,
      applicationId,
      hiredUserId,
    );
  }
}
