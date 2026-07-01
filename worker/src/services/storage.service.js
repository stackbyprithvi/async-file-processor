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
