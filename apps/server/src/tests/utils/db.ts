import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import pg from "pg";

export async function makeDb() {
	const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
	const db = drizzle(pool);
	return { db, pool };
}

export async function migrateUp() {
	const { db, pool } = await makeDb();
	try {
		await migrate(db, { migrationsFolder: "./src/db/migrations" });
	} finally {
		await pool.end();
	}
}

export async function truncateAll(tables: string[]) {
	const { pool } = await makeDb();
	try {
		await pool.query("BEGIN");
		await pool.query("SET session_replication_role = replica");
		await pool.query(
			`TRUNCATE ${tables
				.map((t) => `"${t}"`)
				.join(", ")} RESTART IDENTITY CASCADE`,
		);
		await pool.query("SET session_replication_role = DEFAULT");
		await pool.query("COMMIT");
	} catch (e) {
		await pool.query("ROLLBACK");
		throw e;
	} finally {
		await pool.end();
	}
}
