import express from "express";
import "dotenv/config";
import jobRoutes from "./routes/job.routes.js";

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ message: "API is running 🚀" });
});

app.use("/api/jobs", jobRoutes);

export default app;
