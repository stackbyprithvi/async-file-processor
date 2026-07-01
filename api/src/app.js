import express from "express";
import dotenv from "dotenv";
import pool from "./config/db.js";
import jobRoutes from "./routes/job.routes.js";

dotenv.config();

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ message: "API is running 🚀" });
});

app.use("/api/jobs", jobRoutes);

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await pool.query("SELECT 1");
    console.log("✅ Connected to PostgreSQL");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to connect to PostgreSQL");
    console.error(err);
    process.exit(1);
  }
}

startServer();
