import {
  pgTable,
  text,
  bigint,
  timestamp,
  boolean,
  jsonb,
} from 'drizzle-orm/pg-core';
import type { OnboardingAnswers } from '@repo/shared-types';
import { relations } from 'drizzle-orm/_relations';

export const usersTable = pgTable('users', {
  id: bigint({ mode: 'bigint' }).primaryKey(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  email: text('email').notNull().unique(),
  profilePicture: text('profile_picture').notNull(),
  completedOnboarding: boolean('completed_onboarding').default(false),
  onboardingAnswers: jsonb('onboarding_answers')
    .$type<OnboardingAnswers>()
    .notNull(),
  resumeId: text('resume_id'),
  location: text('location'),
  deleted: boolean('deleted').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const chatsTable = pgTable('chats', {
  id: bigint({ mode: 'bigint' }).primaryKey(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const participantsTable = pgTable('participants', {
  id: bigint({ mode: 'bigint' }).primaryKey(),
  chatId: bigint({ mode: 'bigint' })
    .notNull()
    .references(() => chatsTable.id),
  userId: bigint({ mode: 'bigint' })
    .notNull()
    .references(() => usersTable.id),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const messagesTable = pgTable('messages', {
  id: bigint({ mode: 'bigint' }).primaryKey(),
  chatId: bigint({ mode: 'bigint' })
    .notNull()
    .references(() => chatsTable.id),
  senderId: bigint({ mode: 'bigint' })
    .notNull()
    .references(() => usersTable.id),
  message: text('message').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// RELATIONS

export const participantsTableRelations = relations(
  participantsTable,
  ({ one }) => ({
    chat: one(chatsTable, {
      fields: [participantsTable.chatId],
      references: [chatsTable.id],
    }),

    user: one(usersTable, {
      fields: [participantsTable.userId],
      references: [usersTable.id],
    }),
  }),
);

export const chatsTableRelations = relations(chatsTable, ({ many }) => ({
  participants: many(participantsTable),
  messages: many(messagesTable),
}));

export const messagesTableRelations = relations(messagesTable, ({ one }) => ({
  chat: one(chatsTable, {
    fields: [messagesTable.chatId],
    references: [chatsTable.id],
  }),

  sender: one(usersTable, {
    fields: [messagesTable.senderId], // means: the sender relation connects messages.senderId to users.id
    references: [usersTable.id], // means: which column in the current table (messages) contains the foreign key?
  }),
}));
