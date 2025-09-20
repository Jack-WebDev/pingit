import * as dotenv from "dotenv";

dotenv.config({ path: ".env.development.dist", override: true });

export const env = {
	DATABASE_URL: process.env.DATABASE_URL || "",
	CORS_ORIGIN: process.env.CORS_ORIGIN || "",
	BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET || "",
	BETTER_AUTH_URL: process.env.BETTER_AUTH_URL || "",
};
