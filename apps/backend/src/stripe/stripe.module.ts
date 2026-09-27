import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { StripeController } from './stripe.controller';
import { StripeProvider } from '../providers/stripe';
import { NeonDBProvider } from 'src/providers/postgres-db';

@Module({
  providers: [StripeService, StripeProvider, NeonDBProvider],
  controllers: [StripeController],
})
export class StripeModule {}
