import * as dotenv from "dotenv";

const nodeEnv = process.env.NODE_ENV || "development";

const envFile =
	nodeEnv === "production"
		? ".env.production"
		: nodeEnv === "test"
			? ".env.test"
			: ".env.development";

dotenv.config({ path: envFile, override: false });

function getEnv(key: string, fallback?: string): string | undefined {
	const value = process.env[key];
	return value !== undefined && value !== "" ? value : fallback;
}

export const env = {
	DATABASE_URL: getEnv("DATABASE_URL"),
	POSTGRES_URL: getEnv("POSTGRES_URL"),
	POSTGRES_URL_NON_POOLING: getEnv("POSTGRES_URL_NON_POOLING"),
	CORS_ORIGIN: getEnv("CORS_ORIGIN", ""),
	BETTER_AUTH_SECRET: getEnv("BETTER_AUTH_SECRET", ""),
	BETTER_AUTH_URL: getEnv("BETTER_AUTH_URL", ""),
	API_PORT: Number(process.env.API_PORT) || 3005,
	NODE_ENV: nodeEnv,

	PGHOST: getEnv("PGHOST", "localhost"),
	PGPORT: getEnv("PGPORT", "5432"),
	PGUSER: getEnv("PGUSER", "postgres"),
	PGPASSWORD: getEnv("PGPASSWORD", "postgres"),
	PGDATABASE: getEnv("PGDATABASE", "postgres"),
};
