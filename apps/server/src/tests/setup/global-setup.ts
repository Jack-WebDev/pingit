import { config } from "dotenv";
import { migrateUp } from "../utils/db";

export default async function () {
	config({ path: ".env.test" });
	await migrateUp();
}
