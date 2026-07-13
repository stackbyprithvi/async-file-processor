import pool from ".././config/db.js";
import { drizzle } from "drizzle-orm/node-postgres";

const db = drizzle(pool);

export default db;
