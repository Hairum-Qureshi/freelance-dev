CREATE TABLE "participants" (
	"id" bigint PRIMARY KEY,
	"chat_id" bigint NOT NULL,
	"user_id" bigint NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "chats" DROP COLUMN "participants";--> statement-breakpoint
ALTER TABLE "participants" ADD CONSTRAINT "participants_chat_id_chats_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "chats"("id");--> statement-breakpoint
ALTER TABLE "participants" ADD CONSTRAINT "participants_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id");