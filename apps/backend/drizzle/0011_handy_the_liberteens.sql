CREATE TYPE "public"."experience_level" AS ENUM('beginner/learning', 'entry', 'intermediate');--> statement-breakpoint
CREATE TYPE "public"."file_type" AS ENUM('image', 'pdf');--> statement-breakpoint
CREATE TYPE "public"."job_type" AS ENUM('one-time', 'remote', 'contract', 'full-time', 'part-time');--> statement-breakpoint
CREATE TYPE "public"."looking_for" AS ENUM('frontend developer', 'backend developer', 'full-stack developer', 'mobile developer', 'ui/ux designer', 'graphic designer', 'wordpress developer', 'qa/software tester', 'data analyst');--> statement-breakpoint
CREATE TYPE "public"."payment_type" AS ENUM('fixed-price', 'hourly');--> statement-breakpoint
CREATE TYPE "public"."project_type" AS ENUM('website/web app', 'e-commerce', 'mobile app', 'api/backend', 'database/data', 'bug fix/troubleshooting', 'new feature', 'website redesign', 'maintenance/updates');--> statement-breakpoint
CREATE TYPE "public"."region" AS ENUM('north america', 'south america', 'europe', 'asia', 'africa', 'australia', 'antarctica');--> statement-breakpoint
CREATE TYPE "public"."timeline" AS ENUM('as soon as possible', 'within 1-2 weeks', 'within a month', 'within 2-3 months', 'flexible timeline');--> statement-breakpoint
CREATE TYPE "public"."work_location" AS ENUM('remote', 'onsite', 'hybrid');