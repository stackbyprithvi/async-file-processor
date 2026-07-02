import http from "http";
import app from "./app.js";
import "dotenv/config";
import pool from "./config/db.js";
import { initializeSocket } from "./config/socket.js";

async function startServer() {
  try {
    await pool.query("SELECT 1");
    console.log("✅ Connected to PostgreSQL");

    const PORT = process.env.PORT || 3000;
    const server = http.createServer(app);
    initializeSocket(server);
    server.listen(PORT, () => {
      console.log(`🚀 API running on port ${process.env.PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to connect to PostgreSQL");
    console.error(err);
    process.exit(1);
  }
}

startServer();
