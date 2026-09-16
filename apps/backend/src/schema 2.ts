import {
  pgTable,
  text,
  bigint,
  timestamp,
  boolean,
  jsonb,
} from 'drizzle-orm/pg-core';
import { OnboardingAnswers } from './types';

export const usersTable = pgTable('users', {
  id: bigint({ mode: 'bigint' }).primaryKey(),
  first_name: text('first_name').notNull(),
  last_name: text('last_name').notNull(),
  email: text('email').notNull(),
  profile_picture: text('profile_picture').notNull(),
  completed_onboarding: boolean('completed_onboarding').default(false),
  onboarding_answers: jsonb('onboarding_answers')
    .$type<OnboardingAnswers>()
    .notNull(),
  deleted: boolean('deleted').default(false),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
  resume_url: text('resume_url'),
  location: text('location'),
});
