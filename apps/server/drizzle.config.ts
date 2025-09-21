import { defineConfig } from "drizzle-kit";
import "dotenv/config";

export default defineConfig({
	schema: "./src/db/schema",
	out: "./src/db/migrations",
	dialect: "postgresql",
	dbCredentials: {
		url:
			process.env.POSTGRES_URL_NON_POOLING ??
			process.env.DATABASE_URL ??
			process.env.POSTGRES_URL ??
			"",
	},
	migrations: {
		schema: "public",
		table: "__drizzle_migrations",
	},
});
