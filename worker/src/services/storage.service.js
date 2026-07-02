import minio from ".././config/minio.js";
import "dotenv/config";

export async function downloadFile(fileKey) {
  const stream = await minio.getObject(process.env.MINIO_BUCKET, fileKey);
  const chunks = [];
  return new Promise((resolve, reject) => {
    stream.on("data", (chunk) => {
      chunks.push(chunk);
    });
    stream.on("end", () => {
      resolve(Buffer.concat(chunks));
    });
    stream.on("error", (err) => {
      reject(err);
    });
  });
}

export async function uploadFile({ fileKey, buffer, mimeType }) {
  await minio.putObject(process.env.MINIO_BUCKET, fileKey, buffer, {
    "Content-Type": mimeType || "application/octet-stream",
  });
}
