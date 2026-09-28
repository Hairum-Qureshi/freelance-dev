import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { Database } from 'src/providers/postgres-db';
import { applicationsTable, usersTable } from 'src/schema';
import { Stripe } from 'stripe';
import { ConfigService } from '@nestjs/config';
import { ApplicationPayload, UserPayload } from '@repo/shared-types';

@Injectable()
export class StripeService {
  constructor(
    @Inject('StripeProvider') private readonly stripe: Stripe,
    @Inject('NeonDBProvider') private db: Database,
    private readonly configService: ConfigService,
  ) {}

  private async createAccountLink(accountId: string, userId: string) {
    const accountLink = await this.stripe['v2'].core.accountLinks.create({
      account: accountId,
      use_case: {
        type: 'account_onboarding',
        account_onboarding: {
          configurations: ['recipient'],
          refresh_url: `${this.configService.get('FRONTEND_URL')}/${userId}/settings`,
          return_url: `${this.configService.get('FRONTEND_URL')}/${userId}/settings?section=payments`,
        },
      },
    });

    if (!accountLink)
      throw new HttpException(
        'Failed to create Stripe account link',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

    return accountLink;
  }

  async createConnectedAccount(userId: string, email: string, name: string) {
    const account = await this.stripe['v2'].core.accounts.create({
      display_name: name,
      contact_email: email,
      dashboard: 'express',
      defaults: {
        responsibilities: {
          fees_collector: 'application',
          losses_collector: 'application',
        },
      },
      identity: {
        country: 'US',
        entity_type: 'company',
      },
      configuration: {
        recipient: {
          capabilities: {
            stripe_balance: {
              stripe_transfers: {
                requested: true,
              },
            },
          },
        },
      },
    });

    if (!account)
      throw new HttpException(
        'Failed to create Stripe account',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

    await this.db
      .update(usersTable)
      .set({ stripeAccountId: account.id, stripeAccountConnected: true })
      .where(eq(usersTable.id, userId));

    const accountLink = await this.createAccountLink(account.id, userId);

    return { url: accountLink.url };
  }

  async createPaymentIntent(
    currEmail: string,
    applicationId: string,
    hiredUserId: string,
  ) {
    const application = (await this.db.query.applicationsTable.findFirst({
      where: eq(applicationsTable.id, applicationId),
      with: {
        applicant: true,
        job: true,
      },
    })) as ApplicationPayload | null;

    if (!application) throw new NotFoundException('Application not found');

    if (application.status !== 'accepted')
      throw new BadRequestException('Application is not accepted');

    const user = (await this.db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, hiredUserId))
      .limit(1)
      .then((rows) => (rows.length ? rows[0] : null))) as
      | (UserPayload & { stripeAccountId: string })
      | null;

    if (!user) throw new NotFoundException('User not found');

    if (application.applicant.id !== hiredUserId)
      throw new BadRequestException(
        'Hired user does not match the application',
      );

    if (!application.job.agreedPaymentRateCents)
      throw new BadRequestException(
        'Agreed payment rate is not set for this job',
      );

    if (!user.stripeAccountConnected || !user.stripeAccountId)
      throw new BadRequestException(
        'Hired user does not have a connected Stripe account',
      );

    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: application.job.agreedPaymentRateCents,
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
      transfer_data: {
        destination: user.stripeAccountId,
      },
      receipt_email: currEmail,
    });

    return {
      clientSecret: paymentIntent.client_secret,
    };
  }
}
