ALTER TABLE "messages" RENAME COLUMN "chat_id" TO "chatId";--> statement-breakpoint
ALTER TABLE "messages" RENAME COLUMN "sender_id" TO "senderId";--> statement-breakpoint
ALTER TABLE "participants" RENAME COLUMN "chat_id" TO "chatId";--> statement-breakpoint
ALTER TABLE "participants" RENAME COLUMN "user_id" TO "userId";--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_email_key" UNIQUE("email");