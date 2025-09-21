import { defineConfig } from "drizzle-kit";
import { env } from "../server/src/utils/index.js";

export default defineConfig({
	schema: "./src/db/schema",
	out: "./src/db/migrations",
	dialect: "postgresql",
	dbCredentials: {
		url:
			env.POSTGRES_URL_NON_POOLING ??
			env.DATABASE_URL ??
			env.POSTGRES_URL ??
			"",
	},
	migrations: {
		schema: "public",
		table: "__drizzle_migrations",
	},
});
