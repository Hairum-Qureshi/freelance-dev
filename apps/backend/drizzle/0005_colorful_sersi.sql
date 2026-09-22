CREATE TYPE "public"."file_types" AS ENUM('image', 'pdf');--> statement-breakpoint
ALTER TABLE "attachments" ADD COLUMN "file_types" "file_types" NOT NULL;--> statement-breakpoint
ALTER TABLE "attachments" DROP COLUMN "fileType";