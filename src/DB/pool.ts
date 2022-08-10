import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

const db = new Pool({
  database:
    process.env.NODE_ENV === "dev"
      ? process.env.DB_NAME
      : process.env.DB_TEST_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT as unknown as number,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

export default db;
