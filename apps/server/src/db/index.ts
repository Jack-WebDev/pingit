import { sql } from "@vercel/postgres";
import { drizzle as drizzleNode } from "drizzle-orm/node-postgres";
import { drizzle as drizzleVercel } from "drizzle-orm/vercel-postgres";
import { Pool } from "pg";
import { env } from "../utils/index.js";
import * as schema from "./schema/index.js";

const isProd = env.NODE_ENV === "production" || process.env.VERCEL === "1";

let db: ReturnType<typeof drizzleVercel> | ReturnType<typeof drizzleNode>;

if (isProd) {
	db = drizzleVercel(sql, { schema });
} else {
	const pool = new Pool();
	db = drizzleNode(pool, { schema });
}

export { db };
