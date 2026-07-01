import pool from ".././config/db.js";

export async function updateJobStatus({ id, status, errorMessage }) {
  const query = `
  UPDATE jobs
SET
    status = $2,
    error_message = $3,
    updated_at = NOW()
WHERE id = $1;  
  
  `;
  const values = [id, status, errorMessage];
  const result = await pool.query(query, values);
}
