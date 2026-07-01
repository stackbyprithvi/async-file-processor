import { Queue } from "bullmq";
import IORedis from "ioredis";
import "dotenv/config";

const connection = new IORedis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
});

export const fileQueue = new Queue("file-processing", {
  connection,
});
