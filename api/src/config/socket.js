import { Server } from "socket.io";
import { subscriber } from "./redisSubscriber.js";
let io;
export async function initializeSocket(server) {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });
  await subscriber.subscribe("job-events");

  subscriber.on("message", (channel, message) => {
    const event = JSON.parse(message);
    const roomId = event.jobId || event.id;
    // console.log("Emitting WebSocket event...", event.jobId);
    // io.to(event.jobId).emit("jobUpdate", event);
    // io.emit("jobUpdate", event);
    // console.log("Emit finished.");
    io.to(roomId).emit("jobUpdate", { ...event, jobId: roomId });
  });

  io.on("connection", (socket) => {
    // console.log("🔌 Client Connected:", socket.id);

    socket.on("join-job", (jobId) => {
      socket.join(jobId);
      // console.log(`${socket.id} joined ${jobId}`);
    });

    socket.on("disconnect", () => {
      // console.log("❌ Client disconnected:", socket.id);
    });
  });

  return io;
}
