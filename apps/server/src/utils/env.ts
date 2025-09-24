import * as dotenv from "dotenv";

const nodeEnv = process.env.NODE_ENV || "development";

const envFile =
	nodeEnv === "production"
		? ".env.production"
		: nodeEnv === "test"
			? ".env.test"
			: ".env.development";

dotenv.config({ path: envFile, override: false });

function getOptionalEnv(key: string, fallback = ""): string {
	return process.env[key] || fallback;
}

export const env = {
	DATABASE_URL: getOptionalEnv("DATABASE_URL"),
	POSTGRES_URL: getOptionalEnv("POSTGRES_URL"),
	POSTGRES_URL_NON_POOLING: getOptionalEnv("POSTGRES_URL_NON_POOLING"),
	CORS_ORIGIN: getOptionalEnv("CORS_ORIGIN"),
	BETTER_AUTH_SECRET: getOptionalEnv("BETTER_AUTH_SECRET"),
	BETTER_AUTH_URL: getOptionalEnv("BETTER_AUTH_URL"),
	API_PORT: Number(process.env.API_PORT) || 3005,
	NODE_ENV: nodeEnv,

	// PostgreSQL individual connection parameters
	PGHOST: getOptionalEnv("PGHOST", "localhost"),
	PGPORT: getOptionalEnv("PGPORT", "5432"),
	PGUSER: getOptionalEnv("PGUSER", "postgres"),
	PGPASSWORD: getOptionalEnv("PGPASSWORD", "postgres"),
	PGDATABASE: getOptionalEnv("PGDATABASE", "postgres"),
};
