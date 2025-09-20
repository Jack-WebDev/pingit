import { faker } from "@faker-js/faker";
import { todo } from "../../db/schema/todo";
import { makeDb } from "../utils/db";

export async function createUser(
	attrs: Partial<typeof todo.$inferInsert> = {},
) {
	const { db, pool } = await makeDb();
	try {
		const data = {
			id: faker.number.int({ min: 1, max: 100 }),
			text: faker.lorem.sentence(),
			...attrs,
		};
		const inserted = await db.insert(todo).values(data).returning();
		return inserted[0];
	} finally {
		await pool.end();
	}
}
