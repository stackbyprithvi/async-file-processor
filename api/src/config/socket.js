import { Server } from "socket.io";
let io;
export function initializeSocket(server) {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("🔌 Client Connected:", socket.id);

    socket.on("join-job", (jobId) => {
      socket.join(jobId);
      console.log(`${socket.id} joined ${jobId}`);
    });

    socket.on("job-completed", ({ jobId, status }) => {
      console.log(`Worker says ${jobId} is ${status}`);
      io.to(jobId).emit("job-completed", {
        jobId,
        status,
      });
    });

    socket.on("disconnect", () => {
      console.log("❌ Client disconnected:", socket.id);
    });
  });

  return io;
}
