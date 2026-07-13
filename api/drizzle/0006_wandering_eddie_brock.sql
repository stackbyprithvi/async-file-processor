ALTER TABLE "users" RENAME COLUMN "updates_at" TO "updated_at";--> statement-breakpoint
ALTER TABLE "jobs" ADD COLUMN "updated_at" timestamp DEFAULT now();