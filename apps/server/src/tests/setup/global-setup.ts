import { config } from "dotenv";
import { migrateUp } from "../utils/db";

export default async function () {
	config({ path: ".env.test", override: false });

	if (process.env.RUN_DB_SETUP === "0") {
		console.warn("global-setup: skipping DB setup (RUN_DB_SETUP=0)");
		return;
	}

	const url =
		process.env.POSTGRES_URL ??
		process.env.DATABASE_URL ??
		process.env.POSTGRES_URL_NON_POOLING;

	if (!url || !/^postgres:\/\/.+/.test(url)) {
		console.warn("global-setup: skipping DB setup (no POSTGRES_URL)");
		return;
	}

	await migrateUp();
}
