import { fileQueue } from "./config/redis.js";

await fileQueue.add("test-job", {
  message: "hello world",
});
console.log("Job added");
