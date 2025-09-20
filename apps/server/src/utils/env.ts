import * as dotenv from "dotenv";

const nodeEnv = process.env.NODE_ENV || "development";

const envFile =
	nodeEnv === "production"
		? ".env.production"
		: nodeEnv === "test"
			? ".env.test"
			: ".env.development.dist";

dotenv.config({ path: envFile, override: true });

export const env = {
	DATABASE_URL: process.env.DATABASE_URL || "",
	CORS_ORIGIN: process.env.CORS_ORIGIN || "",
	BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET || "",
	BETTER_AUTH_URL: process.env.BETTER_AUTH_URL || "",
	API_PORT: Number(process.env.API_PORT) || 3005,
	NODE_ENV: nodeEnv,
};
