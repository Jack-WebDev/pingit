import { config } from "dotenv";
import { afterAll, beforeEach } from "vitest";
import { truncateAll } from "../utils/db";

config({ path: ".env.test", override: false });

const TABLES = ["user", "todo"];

beforeEach(async () => {
	if (
		process.env.POSTGRES_URL ||
		process.env.DATABASE_URL ||
		process.env.POSTGRES_URL_NON_POOLING
	) {
		await truncateAll(TABLES);
	}
});

afterAll(async () => {});
