import {
  pgTable,
  text,
  timestamp,
  boolean,
  jsonb,
  uniqueIndex,
  varchar,
  pgEnum,
} from 'drizzle-orm/pg-core';
import type { OnboardingAnswers } from '@repo/shared-types';
import { relations } from 'drizzle-orm';

export const usersTable = pgTable('users', {
  id: text().primaryKey(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  email: varchar({ length: 50 }).notNull().unique(),
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
  id: text().primaryKey(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const participantsTable = pgTable(
  'participants',
  {
    id: text().primaryKey(),
    chatId: text()
      .notNull()
      .references(() => chatsTable.id),
    userId: text()
      .notNull()
      .references(() => usersTable.id),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
  },
  (table) => ({
    uniqueChatUser: uniqueIndex('participants_chat_user_unique').on(
      table.chatId,
      table.userId,
    ),
  }),
);

export const messagesTable = pgTable('messages', {
  id: text().primaryKey(),
  chatId: text()
    .notNull()
    .references(() => chatsTable.id),
  senderId: text()
    .notNull()
    .references(() => usersTable.id),
  message: text('message').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const fileTypesEnum = pgEnum('file_type', ['image', 'pdf']);
export const attachmentsTable = pgTable('attachments', {
  id: text().primaryKey(),
  messageId: text()
    .notNull()
    .references(() => messagesTable.id),
  fileName: text('file_name').notNull(),
  fileId: text('file_id').notNull(),
  fileType: fileTypesEnum('file_type').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// RELATIONS

export const participantsRelations = relations(
  participantsTable,
  ({ one }) => ({
    user: one(usersTable, {
      fields: [participantsTable.userId],
      references: [usersTable.id],
    }),
    chat: one(chatsTable, {
      fields: [participantsTable.chatId],
      references: [chatsTable.id],
    }),
  }),
);

export const messagesRelations = relations(messagesTable, ({ one, many }) => ({
  sender: one(usersTable, {
    fields: [messagesTable.senderId],
    references: [usersTable.id],
  }),
  chat: one(chatsTable, {
    fields: [messagesTable.chatId],
    references: [chatsTable.id],
  }),
  attachments: many(attachmentsTable),
}));

export const usersRelations = relations(usersTable, ({ many }) => ({
  participants: many(participantsTable),
  messages: many(messagesTable),
}));

export const chatsRelations = relations(chatsTable, ({ many }) => ({
  participants: many(participantsTable),
  messages: many(messagesTable),
}));
