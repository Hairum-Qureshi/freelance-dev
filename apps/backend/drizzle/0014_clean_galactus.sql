ALTER TABLE "jobs" ALTER COLUMN "experience_level" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."experience_level";--> statement-breakpoint
CREATE TYPE "public"."experience_level" AS ENUM('beginner', 'entry', 'intermediate');--> statement-breakpoint
ALTER TABLE "jobs" ALTER COLUMN "experience_level" SET DATA TYPE "public"."experience_level" USING "experience_level"::"public"."experience_level";--> statement-breakpoint
ALTER TABLE "jobs" ALTER COLUMN "job_type" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."job_type";--> statement-breakpoint
CREATE TYPE "public"."job_type" AS ENUM('freelance', 'remote', 'contract', 'full-time', 'part-time');--> statement-breakpoint
ALTER TABLE "jobs" ALTER COLUMN "job_type" SET DATA TYPE "public"."job_type" USING "job_type"::"public"."job_type";--> statement-breakpoint
ALTER TABLE "jobs" ALTER COLUMN "looking_for" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."looking_for";--> statement-breakpoint
CREATE TYPE "public"."looking_for" AS ENUM('frontend-developer', 'backend-developer', 'fullstack-developer', 'mobile-developer', 'designer', 'graphic-designer', 'wordpress-developer', 'qa-tester', 'data-analyst');--> statement-breakpoint
ALTER TABLE "jobs" ALTER COLUMN "looking_for" SET DATA TYPE "public"."looking_for" USING "looking_for"::"public"."looking_for";--> statement-breakpoint
ALTER TABLE "jobs" ALTER COLUMN "project_type" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."project_type";--> statement-breakpoint
CREATE TYPE "public"."project_type" AS ENUM('website', 'ecommerce', 'mobile-app', 'api-backend', 'database', 'bug-fix', 'feature', 'redesign', 'maintenance');--> statement-breakpoint
ALTER TABLE "jobs" ALTER COLUMN "project_type" SET DATA TYPE "public"."project_type" USING "project_type"::"public"."project_type";--> statement-breakpoint
ALTER TABLE "jobs" ALTER COLUMN "region" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."region";--> statement-breakpoint
CREATE TYPE "public"."region" AS ENUM('north-america', 'latin-america', 'europe', 'middle-east-africa', 'asia-pacific');--> statement-breakpoint
ALTER TABLE "jobs" ALTER COLUMN "region" SET DATA TYPE "public"."region" USING "region"::"public"."region";--> statement-breakpoint
ALTER TABLE "jobs" ALTER COLUMN "timeline" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."timeline";--> statement-breakpoint
CREATE TYPE "public"."timeline" AS ENUM('asap', '1-2-weeks', '1-month', '2-3-months', 'flexible');--> statement-breakpoint
ALTER TABLE "jobs" ALTER COLUMN "timeline" SET DATA TYPE timeline USING "timeline"::timeline;--> statement-breakpoint
ALTER TABLE "jobs" ALTER COLUMN "work_location" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."work_location";--> statement-breakpoint
CREATE TYPE "public"."work_location" AS ENUM('remote', 'on-site', 'hybrid');--> statement-breakpoint
ALTER TABLE "jobs" ALTER COLUMN "work_location" SET DATA TYPE "public"."work_location" USING "work_location"::"public"."work_location";