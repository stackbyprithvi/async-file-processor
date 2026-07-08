import { connection } from "./config/redis.js";
import { Worker } from "bullmq";
import { updateJobStatus, findJobById } from "./repositories/job.repository.js";
import { downloadFile, uploadFile } from "./services/minio.service.js";
import { publisher } from "./config/redisPublisher.js";

const worker = new Worker(
  "file-processing",
  async (job) => {
    console.log("🔥 GOT JOB", job.id, job.data);
    const { jobId, fileKey } = job.data;
    try {
      await updateJobStatus({
        id: jobId,
        status: "processing",
        errorMessage: null,
      });

      const processingJob = await findJobById(jobId);

      await publisher.publish("job-events", JSON.stringify(processingJob));

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
        status: "completed",
        errorMessage: null,
        processedKey,
      });

      const completedJob = await findJobById(jobId);

      await publisher.publish("job-events", JSON.stringify(completedJob));

      // console.log("Job completed:", jobId);
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
