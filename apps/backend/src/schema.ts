import {
  pgTable,
  text,
  timestamp,
  boolean,
  jsonb,
  uniqueIndex,
  varchar,
  pgEnum,
  integer,
  decimal,
} from 'drizzle-orm/pg-core';
import type { OnboardingAnswers } from '@repo/shared-types';
import { relations } from 'drizzle-orm';

export const userRoleEnum = pgEnum('user_role', ['hirer', 'freelancer']);

export const usersTable = pgTable('users', {
  id: text().primaryKey(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  email: varchar({ length: 50 }).notNull().unique(),
  profilePicture: text('profile_picture').notNull(),
  role: userRoleEnum('role'),
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
  latestMessageId: text('latest_message_id').references(() => messagesTable.id),
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
  url: text('url').notNull(),
  fileType: fileTypesEnum('file_type').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const projectTypeEnum = pgEnum('project_type', [
  'website',
  'ecommerce',
  'mobile-app',
  'api-backend',
  'database',
  'bug-fix',
  'feature',
  'redesign',
  'maintenance',
]);

export const lookingForEnum = pgEnum('looking_for', [
  'frontend-developer',
  'backend-developer',
  'fullstack-developer',
  'mobile-developer',
  'designer',
  'graphic-designer',
  'wordpress-developer',
  'qa-tester',
  'data-analyst',
]);

export const experienceLevelEnum = pgEnum('experience_level', [
  'beginner',
  'entry',
  'intermediate',
]);

export const jobTypeEnum = pgEnum('job_type', [
  'freelance',
  'remote',
  'contract',
  'full-time',
  'part-time',
]);

export const paymentTypeEnum = pgEnum('payment_type', [
  'fixed-price',
  'hourly',
]);

export const workLocationEnum = pgEnum('work_location', [
  'remote',
  'on-site',
  'hybrid',
]);

export const regionEnum = pgEnum('region', [
  'north-america',
  'latin-america',
  'europe',
  'middle-east-africa',
  'asia-pacific',
]);

export const timelineEnum = pgEnum('timeline', [
  'asap',
  '1-2-weeks',
  '1-month',
  '2-3-months',
  'flexible',
]);

export const jobPostsTable = pgTable('jobs', {
  id: text().primaryKey(),
  jobTitle: text('job_title').notNull(),
  businessName: text('business_name').notNull(),
  projectType: projectTypeEnum('project_type').notNull(),
  lookingFor: lookingForEnum('looking_for').notNull(),
  experienceLevel: experienceLevelEnum('experience_level').notNull(),
  jobType: jobTypeEnum('job_type').notNull(),
  paymentType: paymentTypeEnum('payment_type').notNull(),
  workLocation: workLocationEnum('work_location').notNull(),
  region: regionEnum('region').notNull(),
  timeline: timelineEnum('timeline').notNull(),
  projectDetails: text('project_details').notNull(),
  deliverables: text('deliverables').notNull(),
  salaryMin: integer('budget_min').notNull(),
  salaryMax: integer('budget_max').notNull(),
  skills: text('skills')
    .array()
    .notNull()
    .$default(() => []),
  posterId: text('poster_id')
    .notNull()
    .references(() => usersTable.id),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const ratingsTable = pgTable('ratings', {
  id: text().primaryKey(),
  jobId: text('job_id')
    .notNull()
    .references(() => jobPostsTable.id),
  posterId: text('user_id')
    .notNull()
    .references(() => usersTable.id),
  rating: decimal({ precision: 2, scale: 1 }).notNull(),
  comment: text('comment'),
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
  ratings: many(ratingsTable),
}));

export const chatsRelations = relations(chatsTable, ({ many, one }) => ({
  participants: many(participantsTable),
  messages: many(messagesTable),
  latestMessage: one(messagesTable, {
    fields: [chatsTable.latestMessageId],
    references: [messagesTable.id],
  }),
}));

export const attachmentsRelations = relations(attachmentsTable, ({ one }) => ({
  message: one(messagesTable, {
    fields: [attachmentsTable.messageId],
    references: [messagesTable.id],
  }),
}));

export const jobPostsRelations = relations(jobPostsTable, ({ one }) => ({
  poster: one(usersTable, {
    fields: [jobPostsTable.posterId],
    references: [usersTable.id],
  }),
}));

export const ratingsRelations = relations(ratingsTable, ({ one }) => ({
  job: one(jobPostsTable, {
    fields: [ratingsTable.jobId],
    references: [jobPostsTable.id],
  }),
  poster: one(usersTable, {
    fields: [ratingsTable.posterId],
    references: [usersTable.id],
  }),
}));
