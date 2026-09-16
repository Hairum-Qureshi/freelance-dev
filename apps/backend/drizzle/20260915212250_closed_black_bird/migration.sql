CREATE TABLE "users" (
	"id" bigint PRIMARY KEY,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"email" text NOT NULL,
	"profile_picture" text NOT NULL,
	"completed_onboarding" boolean DEFAULT false,
	"onboarding_answers" jsonb NOT NULL,
	"deleted" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resume_url" text,
	"location" text
);
