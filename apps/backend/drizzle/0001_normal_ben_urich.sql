ALTER TABLE "chats" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "messages" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "messages" ALTER COLUMN "chatId" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "messages" ALTER COLUMN "senderId" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "participants" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "participants" ALTER COLUMN "chatId" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "participants" ALTER COLUMN "userId" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "id" SET DATA TYPE text;