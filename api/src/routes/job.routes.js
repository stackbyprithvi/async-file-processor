import { Router } from "express";
import uploadMiddleware from "../middlewares/upload.middleware.js";
import { upload } from ".././controllers/job.controller.js";

const router = Router();

router.post("/uploads", uploadMiddleware.single("file"), upload);
export default router;
