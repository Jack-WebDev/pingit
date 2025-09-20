import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "drizzle-kit";
import { env } from "../../apps/server/src/utils";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
	schema: path.join(__dirname, "src/db/schema/**/*.ts"),
	out: path.join(__dirname, "src/db/migrations"),
	dialect: "postgresql",
	dbCredentials: {
		url: env.DATABASE_URL,
	},
	migrations: {
		schema: "public",
		table: "__drizzle_migrations",
	},
});
