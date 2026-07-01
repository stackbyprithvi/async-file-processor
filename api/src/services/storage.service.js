import minio from ".././config/minio.js";
import "dotenv/config";

export async function uploadFile({ buffer, fileKey, mimeType }) {
  await minio.putObject(process.env.MINIO_BUCKET, fileKey, buffer, {
    "Content-Type": mimeType,
  });
  return {
    fileKey,
  };
}
