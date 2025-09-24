import { config } from "dotenv";
import { getConnectionString, migrateUp } from "../utils/db";

export default async function () {
	config({ path: ".env.test", override: true });

	console.log("Test environment loaded");
	console.log("NODE_ENV:", process.env.NODE_ENV);
	console.log("PGHOST:", process.env.PGHOST);
	console.log("PGPORT:", process.env.PGPORT);
	console.log("PGUSER:", process.env.PGUSER);
	console.log("PGDATABASE:", process.env.PGDATABASE);
	console.log("Has PGPASSWORD:", !!process.env.PGPASSWORD);

	try {
		const conn = getConnectionString();
		await migrateUp(conn);
		console.log("Global setup completed successfully");
	} catch (error) {
		console.error("Global setup failed:", error);
		throw error;
	}
}
