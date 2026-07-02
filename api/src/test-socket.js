import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

socket.on("connect", () => {
  console.log("✅ Connected:", socket.id);

  socket.emit("join-job", "job123");
});
socket.on("disconnect", () => {
  console.log("Disconnected");
});
