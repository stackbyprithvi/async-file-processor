import pool from ".././config/db.js";

export async function updateJobStatus({
  id,
  status,
  errorMessage,
  processedKey,
}) {
  const query = `
  UPDATE jobs
SET
    status = $2,
    error_message = $3,
    updated_at = NOW(),
    processed_key = $4
WHERE id = $1;  
  
  `;
  const values = [id, status, errorMessage, processedKey];
  const result = await pool.query(query, values);
}

export async function findJobById(id) {
  const query = `
  SELECT * FROM jobs WHERE id=$1
  `;
  const result = await pool.query(query, [id]);
  return result.rows[0];
}
export async function findJobByIdJoin(id) {
  const query = `
  SELECT jobs.*, video_metadata.* FROM jobs 
  INNER JOIN video_metadata ON jobs.id=video_metadata.job_id
  WHERE jobs.id=$1
  `;
  const result = await pool.query(query, [id]);
  return result.rows[0];
}
