import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

const db = new Pool({
  connectionString:
    process.env.NODE_ENV === "dev"
      ? process.env.DATABASE_URL
      : process.env.DATABASE_URL_TEST,
});

export default db;
