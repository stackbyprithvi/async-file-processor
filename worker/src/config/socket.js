import { io } from "socket.io-client";
import "dotenv/config";

export const socket = io(process.env.SOCKET_SERVER_URL, {
  transports: ["websocket"],
});

socket.on("connect", () => {
  console.log("🔌 Worker connected:", socket.id);
});

socket.on("disconnect", () => {
  console.log("❌ Worker disconnected");
});
