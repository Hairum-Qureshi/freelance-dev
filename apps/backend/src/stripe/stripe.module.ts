import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { StripeController } from './stripe.controller';
import { StripeProvider } from '../providers/stripe';

@Module({
  providers: [StripeService, StripeProvider],
  controllers: [StripeController],
})
export class StripeModule {}
