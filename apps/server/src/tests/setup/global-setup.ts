import { config } from "dotenv";
import { migrateUp } from "../utils/db";

function ensurePgVarsFromUrl(url?: string) {
	if (!url) return;
	try {
		const u = new URL(url);
		process.env.PGHOST ??= u.hostname;
		process.env.PGPORT ??= u.port || "5432";
		process.env.PGUSER ??= decodeURIComponent(u.username || "postgres");
		process.env.PGPASSWORD ??= decodeURIComponent(u.password || "postgres");
		process.env.PGDATABASE ??=
			(u.pathname || "/postgres").slice(1) || "postgres";
	} catch {}
}

export default async function () {
	config({ path: ".env.test", override: false });

	const url =
		process.env.POSTGRES_URL_NON_POOLING ||
		process.env.DATABASE_URL ||
		process.env.POSTGRES_URL;

	const hadPg =
		process.env.PGHOST ||
		process.env.PGUSER ||
		process.env.PGPASSWORD ||
		process.env.PGDATABASE;

	if (!hadPg) {
		ensurePgVarsFromUrl(url);
	}

	console.log("Test environment loaded");
	console.log("NODE_ENV:", process.env.NODE_ENV);
	console.log("PGHOST:", process.env.PGHOST);
	console.log("PGPORT:", process.env.PGPORT);
	console.log("PGUSER:", process.env.PGUSER);
	console.log("PGDATABASE:", process.env.PGDATABASE);
	console.log("Has PGPASSWORD:", Boolean(process.env.PGPASSWORD));

	await migrateUp();

	console.log("Migrations completed successfully");
	console.log("Global setup completed successfully");
}
