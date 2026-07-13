CREATE TABLE "jobs" (
	"id" uuid PRIMARY KEY NOT NULL,
	"file_key" text NOT NULL,
	"file_name" text NOT NULL,
	"status" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
