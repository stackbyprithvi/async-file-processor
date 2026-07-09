import { connection } from "./config/redis.js";
import { Worker } from "bullmq";
import { updateJobStatus, findJobById } from "./repositories/job.repository.js";
import { downloadFile, uploadFile } from "./services/minio.service.js";
import { publisher } from "./config/redisPublisher.js";
import { runFFmpeg } from "./services/ffmpeg.service.js";
import path from "path";
import fs from "fs/promises";

const worker = new Worker(
  "file-processing",
  async (job) => {
    const { jobId, fileKey } = job.data;
    const extension = path.extname(fileKey);
    const inputPath = path.join(
      process.cwd(),
      "temp",
      `job-${jobId}-input${extension}`,
    );
    const outputPath = path.join(
      process.cwd(),
      "temp",
      `job-${jobId}-output.mp4`,
    );

    try {
      await updateJobStatus({
        id: jobId,
        status: "processing",
        errorMessage: null,
      });

      const processingJob = await findJobById(jobId);

      await publisher.publish("job-events", JSON.stringify(processingJob));

      await downloadFile(fileKey, inputPath);

      await runFFmpeg(inputPath, outputPath);
      console.log("✅ FFmpeg finished");

      const processedKey = `processed/${fileKey}`;

      await uploadFile({
        fileKey: processedKey,
        outputPath,
        mimeType: "video/mp4",
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
    } finally {
      try {
        await fs.unlink(inputPath);
      } catch {}

      try {
        await fs.unlink(outputPath);
      } catch {}
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
