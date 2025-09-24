import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import pg from "pg";

export function getConnectionString(): string {
	const url =
		process.env.POSTGRES_URL ??
		process.env.DATABASE_URL ??
		process.env.POSTGRES_URL_NON_POOLING;

	if (url && typeof url === "string" && url.length > 0) {
		try {
			new URL(url);
			return url;
		} catch (e) {
			console.warn("Invalid URL format, falling back to individual parameters");
			console.log(e);
		}
	}

	const host = process.env.PGHOST || "localhost";
	const port = process.env.PGPORT || "5432";
	const user = process.env.PGUSER || "postgres";
	const password = process.env.PGPASSWORD || "postgres";
	const database = process.env.PGDATABASE || "postgres";

	const connStr = `postgres://${encodeURIComponent(
		String(user),
	)}:${encodeURIComponent(String(password))}@${host}:${port}/${database}`;

	console.log(
		`Connection string (password masked): postgres://${encodeURIComponent(
			String(user),
		)}:***@${host}:${port}/${database}`,
	);

	return connStr;
}

export async function makeDb(connStr: string = getConnectionString()) {
	try {
		const pool = new pg.Pool({
			connectionString: connStr,
			ssl:
				process.env.NODE_ENV === "production"
					? { rejectUnauthorized: false }
					: false,
			connectionTimeoutMillis: 10000,
			idleTimeoutMillis: 30000,
		});

		const client = await pool.connect();
		client.release();

		const db = drizzle(pool);
		return { db, pool };
	} catch (error) {
		console.error("Failed to create database connection:", error);
		throw error;
	}
}

export async function migrateUp(connStr?: string) {
	const { db, pool } = await makeDb(connStr);
	try {
		await migrate(db, { migrationsFolder: "./src/db/migrations" });
		console.log("Migrations completed successfully");
	} catch (error) {
		console.error("Migration failed:", error);
		throw error;
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
			`TRUNCATE ${tables
				.map((t) => `"${t}"`)
				.join(", ")} RESTART IDENTITY CASCADE`,
		);
		await pool.query("SET session_replication_role = DEFAULT");
		await pool.query("COMMIT");
		console.log(`Truncated tables: ${tables.join(", ")}`);
	} catch (e) {
		await pool.query("ROLLBACK");
		console.error("Truncate failed:", e);
		throw e;
	} finally {
		await pool.end();
	}
}
