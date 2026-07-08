import express from "express";
import "dotenv/config";
import jobRoutes from "./routes/job.routes.js";
import authRoutes from "./routes/auth.routes.js";
import cors from "cors";
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ message: "API is running 🚀" });
});

app.use("/api/jobs", jobRoutes);
app.use("/auth", authRoutes);

export default app;
