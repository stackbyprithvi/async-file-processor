import { resolve } from "dns";
import minio from "../config/minio.js";
import "dotenv/config";
import fs from "fs";
import path from "path";
import { rejects } from "assert";

export async function downloadFile(fileKey, inputPath) {
  const stream = await minio.getObject(process.env.MINIO_BUCKET, fileKey);
  const writeStream = fs.createWriteStream(inputPath);
  return new Promise((resolve, reject) => {
    stream.pipe(writeStream);
    writeStream.on("finish", resolve);
    writeStream.on("error", reject);
    stream.on("error", reject);
  });
}

export async function uploadFile({ fileKey, outputPath, mimeType }) {
  const stream = fs.createReadStream(outputPath);

  await minio.putObject(process.env.MINIO_BUCKET, fileKey, stream, {
    "Content-Type": mimeType,
  });
}
