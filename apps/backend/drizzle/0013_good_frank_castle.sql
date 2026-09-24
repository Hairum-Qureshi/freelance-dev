CREATE TYPE "public"."user_role" AS ENUM('hirer', 'freelancer');--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "role" "user_role";