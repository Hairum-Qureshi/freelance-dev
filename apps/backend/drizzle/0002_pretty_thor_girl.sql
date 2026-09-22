CREATE TABLE "attachments" (
	"id" text PRIMARY KEY NOT NULL,
	"messageId" text NOT NULL,
	"file_name" text NOT NULL,
	"file_id" text NOT NULL,
	"file_type" "file_types" NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "attachments" ADD CONSTRAINT "attachments_messageId_messages_id_fk" FOREIGN KEY ("messageId") REFERENCES "public"."messages"("id") ON DELETE no action ON UPDATE no action;