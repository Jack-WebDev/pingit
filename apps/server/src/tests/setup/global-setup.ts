import { config } from "dotenv";
import { getConnectionString, migrateUp } from "../utils/db";

export default async function () {
	config({ path: ".env.test", override: false });

	const conn = getConnectionString();
	await migrateUp(conn);
}
