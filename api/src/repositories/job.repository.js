import pool from ".././config/db.js";

export async function createJob({ id, fileKey, status }) {
  const query = `
    INSERT INTO jobs (id, file_key, status)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const values = [id, fileKey, status];

  const result = await pool.query(query, values);

  return result.rows[0];
}

export async function findJobByIdRepo(id) {
  const query = `
  SELECT * FROM jobs WHERE id=$1
  `;
  const result = await pool.query(query, [id]);
  return result.rows[0];
}
