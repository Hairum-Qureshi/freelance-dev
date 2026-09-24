CREATE TABLE "jobs" (
	"id" text PRIMARY KEY NOT NULL,
	"job_title" text NOT NULL,
	"business_name" text NOT NULL,
	"project_type" "project_type" NOT NULL,
	"looking_for" "looking_for" NOT NULL,
	"experience_level" "experience_level" NOT NULL,
	"job_type" "job_type" NOT NULL,
	"payment_type" "payment_type" NOT NULL,
	"work_location" "work_location" NOT NULL,
	"region" "region" NOT NULL,
	"timeline" timeline NOT NULL,
	"project_details" text NOT NULL,
	"deliverables" text NOT NULL,
	"budget_min" integer NOT NULL,
	"budget_max" integer NOT NULL,
	"tags" text[] NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
DROP TYPE "public"."file_type";