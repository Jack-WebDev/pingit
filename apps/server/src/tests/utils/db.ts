import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import pg from "pg";

export function getConnectionString(): string {
	const url =
		process.env.POSTGRES_URL ??
		process.env.DATABASE_URL ??
		process.env.POSTGRES_URL_NON_POOLING;

	if (url && typeof url === "string" && url.length > 0) {
		new URL(url);
		return url;
	}

	const host = process.env.PGHOST || "localhost";
	const port = process.env.PGPORT || "5432";
	const user = process.env.PGUSER || "postgres";
	const password = process.env.PGPASSWORD ?? "postgres";
	const database = process.env.PGDATABASE || "postgres";
	return `postgres://${encodeURIComponent(user)}:${encodeURIComponent(
		password,
	)}@${host}:${port}/${database}`;
}

export async function makeDb(connStr: string = getConnectionString()) {
	const pool = new pg.Pool({ connectionString: connStr });
	const db = drizzle(pool);
	return { db, pool };
}

export async function migrateUp(connStr?: string) {
	const { db, pool } = await makeDb(connStr);
	try {
		await migrate(db, { migrationsFolder: "./src/db/migrations" });
	} finally {
		await pool.end();
	}
}

export async function truncateAll(tables: string[], connStr?: string) {
	const { pool } = await makeDb(connStr);
	try {
		await pool.query("BEGIN");
		await pool.query("SET session_replication_role = replica");
		await pool.query(
			`TRUNCATE ${tables.map((t) => `"${t}"`).join(", ")} RESTART IDENTITY CASCADE`,
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
