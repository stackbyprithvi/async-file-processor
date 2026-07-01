import { fileQueue } from ".././config/redis.js";

export async function enqueueJob({ jobId, fileKey }) {
  await fileQueue.add("process-file", {
    jobId,
    fileKey,
  });
}
