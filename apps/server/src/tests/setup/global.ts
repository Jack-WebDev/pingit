import { config } from "dotenv";
import { afterAll, beforeEach } from "vitest";
import { truncateAll } from "../utils/db";

config({ path: ".env.test" });

const TABLES = ["user", "todo"];

beforeEach(async () => {
	await truncateAll(TABLES);
});

afterAll(async () => {
	// Optionally drop schema or stop containers here if you started them programmatically
});
