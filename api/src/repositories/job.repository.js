import pool from ".././config/db.js";

export async function createJob({ id, fileKey, fileName, status }) {
  const query = `
    INSERT INTO jobs (id, file_key, file_name, status)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const values = [id, fileKey, fileName, status];

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
