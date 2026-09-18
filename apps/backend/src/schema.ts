import {
  pgTable,
  text,
  bigint,
  timestamp,
  boolean,
  jsonb,
} from 'drizzle-orm/pg-core';
import type { OnboardingAnswers } from '@repo/shared-types';

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
  resume_id: text('resume_id'),
  location: text('location'),
  deleted: boolean('deleted').default(false),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
});

export const chatsTable = pgTable('chats', {
  id: bigint({ mode: 'bigint' }).primaryKey(),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
});

export const participantsTable = pgTable('participants', {
  id: bigint({ mode: 'bigint' }).primaryKey(),
  chat_id: bigint({ mode: 'bigint' })
    .notNull()
    .references(() => chatsTable.id),
  user_id: bigint({ mode: 'bigint' })
    .notNull()
    .references(() => usersTable.id),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
});

export const messagesTable = pgTable('messages', {
  id: bigint({ mode: 'bigint' }).primaryKey(),
  chat_id: bigint({ mode: 'bigint' })
    .notNull()
    .references(() => chatsTable.id),
  sender_id: bigint({ mode: 'bigint' })
    .notNull()
    .references(() => usersTable.id),
  message: text('message').notNull(),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
});
