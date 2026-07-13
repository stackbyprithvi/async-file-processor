import { integer } from "drizzle-orm/gel-core";
import { varchar } from "drizzle-orm/mysql-core";
import {
  pgTable,
  uuid,
  text,
  timestamp,
  varchar,
  real,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const jobs = pgTable("jobs", {
  id: uuid("id").primaryKey(),
  fileKey: text("file_key").notNull(),
  fileName: text("file_name").notNull(),
  status: text("status").notNull(),
  errorMessage: text("error_message"),
  processedKey: text("processed_key"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  googleId: varchar("google_id", { length: 255 }).unique().notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  avatar: text("avatar"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const videoMetadata = pgTable("video_metadata", {
  // job_id UUID PRIMARY KEY REFERENCES jobs(id)
  jobId: uuid("job_id")
    .primaryKey()
    .references(() => jobs.id, { onDelete: "cascade" }),
  duration: real("duration").notNull(),
  width: integer("width").notNull(),
  height: integer("height").notNull(),
  codec: text("codec").notNull(),
  fps: real("fps").notNull(),
  bitrate: integer("bitrate").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const jobsRelations = relations(jobs, ({ one }) => ({
  metadata: one(videoMetadata),
}));

export const videoMetadataRelations = relations(videoMetadata, ({ one }) => ({
  job: one(jobs, {
    fields: [videoMetadata.jobId],
    references: [jobs.id],
  }),
}));
