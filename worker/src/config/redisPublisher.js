import IORedis from "ioredis";
import "dotenv/config";

export const publisher = new IORedis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
});
