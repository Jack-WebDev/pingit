import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { env } from "../utils";

const pool = new Pool({
	connectionString: env.DATABASE_URL,
	max: 1,
});

export const db = drizzle(pool);
