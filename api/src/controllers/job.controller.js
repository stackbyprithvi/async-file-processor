import { v4 as uuid } from "uuid";
import path from "path";

import { uploadFile } from "../services/storage.service.js";
import { createJob } from ".././repositories/job.repository.js";
import { enqueueJob } from ".././services/queue.service.js";

export async function upload(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    const jobId = uuid();

    const extension = path.extname(req.file.originalname);

    const fileKey = `uploads/${jobId}${extension}`;

    await uploadFile({
      buffer: req.file.buffer,
      fileKey,
      mimeType: req.file.mimetype,
    });

    const job = await createJob({ id: jobId, fileKey, status: "queued" });

    await enqueueJob({ jobId, fileKey });

    await res.status(201).json(job);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to upload file",
    });
  }
}
