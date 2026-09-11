import { neon } from '@neondatabase/serverless';
import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { OnboardingDTO } from 'src/DTOs/onboarding.dto';

@Injectable()
export class UserService {
  constructor(@Inject('NeonDBProvider') private sql: ReturnType<typeof neon>) {}

  async submitOnboardingAnswers(userID: string, onboardingData: OnboardingDTO) {
    await this
      .sql`UPDATE users SET "onboardingAnswers" = ${onboardingData} WHERE id = ${userID}`;
  }
}
