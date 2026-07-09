import pool from "../config/db.js";

export async function findOrCreateUser(profile) {
  const { rows } = await pool.query(
    `SELECT * FROM users WHERE google_id = $1`,
    [profile.id],
  );

  if (rows.length > 0) return rows[0];

  const { rows: newRows } = await pool.query(
    `INSERT INTO users (google_id, name, email, avatar)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [profile.id, profile.name, profile.email, profile.picture],
  );

  return newRows[0];
}
