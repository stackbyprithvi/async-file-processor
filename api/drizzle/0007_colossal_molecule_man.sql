CREATE TABLE "video_metadata" (
	"job_id" uuid PRIMARY KEY NOT NULL,
	"duration" real NOT NULL,
	"width" integer NOT NULL,
	"height" integer NOT NULL,
	"codec" text NOT NULL,
	"fps" real NOT NULL,
	"bitrate" integer NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "video_metadata" ADD CONSTRAINT "video_metadata_job_id_jobs_id_fk" FOREIGN KEY ("job_id") REFERENCES "public"."jobs"("id") ON DELETE cascade ON UPDATE no action;