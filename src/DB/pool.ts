import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 60000,
  connectionTimeoutMillis: 5000,
});

export default db;
