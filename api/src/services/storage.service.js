import minio from ".././config/minio.js";
import "dotenv/config";

const bucketName = process.env.MINIO_BUCKET;

export async function uploadFile({ buffer, fileKey, mimeType }) {
  const exists = await minio.bucketExists(bucketName);
  if (!exists) {
    await minio.makeBucket(bucketName, "us-east-1");
    console.log(`Bucket ${bucketName} created`);
  }
  await minio.putObject(process.env.MINIO_BUCKET, fileKey, buffer, {
    "Content-Type": mimeType,
  });
  return {
    fileKey,
  };
}
