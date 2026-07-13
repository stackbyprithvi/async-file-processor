import pool from ".././config/db.js";

export async function createVideoMetadata(jobId, metadata) {
  const { duration, width, height, codec, fps, bitrate } = metadata;
  const query = `
    INSERT INTO video_metadata(
      job_id, duration, width, height, codec, fps, bitrate        
    )
    VALUES(
    $1, $2, $3, $4,$5,$6,$7)
    RETURNING *
    `;
  const result = await pool.query(query, [
    jobId,
    duration,
    width,
    height,
    codec,
    fps,
    bitrate,
  ]);
  return result.rows[0];
}
