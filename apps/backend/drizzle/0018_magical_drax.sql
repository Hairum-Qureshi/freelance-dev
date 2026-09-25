CREATE TYPE "public"."status" AS ENUM('accepted', 'rejected', 'pending');--> statement-breakpoint
ALTER TABLE "applications" ADD COLUMN "status" "status" NOT NULL;