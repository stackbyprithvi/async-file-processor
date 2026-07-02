import { connection } from "./config/redis.js";
import { Worker } from "bullmq";
import { updateJobStatus } from "./repositories/job.repository.js";
import { downloadFile, uploadFile } from "./services/storage.service.js";
import { socket } from "./config/socket.js";

const worker = new Worker(
  "file-processing",
  async (job) => {
    const { jobId, fileKey } = job.data;
    try {
      await updateJobStatus({
        id: jobId,
        status: "processing",
        errorMessage: null,
      });

      const buffer = await downloadFile(fileKey);
      const content = buffer.toString("utf-8");

      const processedContent = content.toUpperCase();
      const processedBuffer = Buffer.from(processedContent);

      const processedKey = `processed/${fileKey}`;

      await uploadFile({
        fileKey: processedKey,
        buffer: processedBuffer,
        mimeType: "text/plain",
      });

      await updateJobStatus({
        id: jobId,
        status: "success",
        errorMessage: null,
      });

      console.log("Socket connected?", socket.connected);
      socket.emit("job-completed", {
        jobId,
        status: "success",
      });

      console.log("Job completed:", jobId);
    } catch (err) {
      await updateJobStatus({
        id: jobId,
        status: "failed",
        errorMessage: err.message,
      });
      console.error("Job failed:", err);
    }
  },
  {
    connection,
  },
);

// worker.on("completed", (job) => {
//   console.log(`Job ${job.id} completed`);
// });

// worker.on("failed", (job, err) => {
//   console.error(`Job ${job?.id} failed`, err);
// });

console.log("🚀 Worker is listening...");
