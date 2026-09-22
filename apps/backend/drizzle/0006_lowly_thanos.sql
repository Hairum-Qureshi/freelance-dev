ALTER TYPE "public"."file_types" RENAME TO "file_type";--> statement-breakpoint
ALTER TABLE "attachments" RENAME COLUMN "file_types" TO "file_type";