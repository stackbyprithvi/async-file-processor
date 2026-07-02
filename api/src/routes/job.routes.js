import { Router } from "express";
import uploadMiddleware from "../middlewares/upload.middleware.js";
import { upload, getJobById } from ".././controllers/job.controller.js";

const router = Router();

router.post("/uploads", uploadMiddleware.single("file"), upload);

router.get("/:id", getJobById);

export default router;
