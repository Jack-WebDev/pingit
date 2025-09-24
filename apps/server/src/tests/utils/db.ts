import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import pg from "pg";

function buildPgConfig(): pg.PoolConfig {
	const rawUrl =
		process.env.POSTGRES_URL ??
		process.env.DATABASE_URL ??
		process.env.POSTGRES_URL_NON_POOLING;

	if (rawUrl && typeof rawUrl === "string" && rawUrl.length > 0) {
		try {
			new URL(rawUrl);
		} catch (e) {
			throw new Error(`Invalid POSTGRES_URL: ${(e as Error).message}`);
		}
		return { connectionString: rawUrl };
	}

	return {
		host: String(process.env.PGHOST ?? "localhost"),
		port: Number(process.env.PGPORT ?? "5432"),
		user: String(process.env.PGUSER ?? "postgres"),
		password: String(process.env.PGPASSWORD ?? "postgres"),
		database: String(process.env.PGDATABASE ?? "postgres"),
	};
}

export async function makeDb() {
	const pool = new pg.Pool(buildPgConfig());
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
