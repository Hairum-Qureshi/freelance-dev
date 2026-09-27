import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { Database } from 'src/providers/postgres-db';
import { usersTable } from 'src/schema';
import { Stripe } from 'stripe';

@Injectable()
export class StripeService {
  constructor(
    @Inject('StripeProvider') private readonly stripe: Stripe,
    @Inject('NeonDBProvider') private db: Database,
  ) {}

  private async createAccountLink(accountId: string) {
    const accountLink = await this.stripe['v2'].core.accountLinks.create({
      account: accountId,
      use_case: {
        type: 'account_onboarding',
        account_onboarding: {
          configurations: ['recipient'],
          refresh_url: 'https://example.com',
          return_url: `https://example.com?accountId=${accountId}`,
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

    const accountLink = await this.createAccountLink(account.id);

    return { accountLink };
  }
}
