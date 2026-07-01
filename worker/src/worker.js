import { connection } from "./config/redis.js";
import { Worker } from "bullmq";
import { updateJobStatus } from "./repositories/job.repository.js";
import { downloadFile } from "./services/storage.service.js";

const worker = new Worker(
  "file-processing",
  async (job) => {
    const { jobId, fileKey } = job.data;

    await updateJobStatus({
      id: jobId,
      status: "processing",
      errorMessage: null,
    });

    const buffer = await downloadFile(fileKey);
    console.log("Downloaded file size:", buffer.length, "bytes");
  },
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

console.log("🚀 Worker is listening...");
