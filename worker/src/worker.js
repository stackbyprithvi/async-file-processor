import { connection } from "./config/redis.js";
import { Worker } from "bullmq";
import {processVideoJob} from "./processors/video.processpr.js";

const worker = new Worker(
  "file-processing",
 processVideoJob,
  {
    connection,
  },
);

worker.on("completed", (job) => {
  console.log(`Job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
  console.error(`Job ${job?.id} failed`, err);
});
connection.on("ready", () => {
  console.log("✅ Redis Ready");
});

connection.on("error", (err) => {
  console.error(err);
});

console.log("🚀 Worker is listening...");
