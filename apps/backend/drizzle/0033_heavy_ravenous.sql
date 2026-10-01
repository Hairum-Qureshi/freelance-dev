CREATE TABLE "reviews" (
	"id" text PRIMARY KEY NOT NULL,
	"role" "user_role" NOT NULL,
	"reviewer_id" text NOT NULL,
	"review" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_reviewer_id_users_id_fk" FOREIGN KEY ("reviewer_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "job_reviewer_unique" ON "reviews" USING btree ("reviewer_id");