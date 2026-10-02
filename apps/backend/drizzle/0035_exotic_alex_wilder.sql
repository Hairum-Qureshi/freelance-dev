ALTER TABLE "ratings" RENAME COLUMN "user_id" TO "poster_id";--> statement-breakpoint
ALTER TABLE "ratings" DROP CONSTRAINT "ratings_user_id_users_id_fk";
--> statement-breakpoint
DROP INDEX "job_poster_unique";--> statement-breakpoint
ALTER TABLE "ratings" ADD CONSTRAINT "ratings_poster_id_users_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "job_poster_unique" ON "ratings" USING btree ("job_id","poster_id");