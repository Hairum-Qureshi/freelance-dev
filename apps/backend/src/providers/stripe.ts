import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { HttpException, HttpStatus } from '@nestjs/common';

export const StripeProvider = {
  provide: 'StripeProvider',
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const STRIPE_SECRET_KEY = configService.get<string>('STRIPE_SECRET_KEY');

    if (!STRIPE_SECRET_KEY)
      throw new HttpException(
        'Stripe secret key not found',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

    const stripe = new Stripe(STRIPE_SECRET_KEY, {
      apiVersion: '2026-08-26.dahlia',
    });
    return stripe;
  },
};
