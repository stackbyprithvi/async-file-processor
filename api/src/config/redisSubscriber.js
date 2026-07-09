import IORedis from "ioredis";
import "dotenv/config";

export const subscriber = new IORedis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
});
