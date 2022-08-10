import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

const db = new Pool({
  connectionString:
    process.env.NODE_ENV === "dev"
      ? process.env.CONNECT
      : process.env.CONNECT_TEST,
});

export default db;
