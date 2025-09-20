import { defineConfig } from "drizzle-kit";

import { env } from "../../apps/server/src/utils";

export default defineConfig({
	schema: "./src/db/schema",
	out: "./src/db/migrations",
	dialect: "postgresql",
	dbCredentials: {
		url: env.DATABASE_URL,
	},
	migrations: {
		schema: "public",
		table: "__drizzle_migrations",
	},
});
