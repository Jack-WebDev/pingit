import { expect, it } from "vitest";
import { createTestContext } from "../../lib/context";
import { appRouter } from "../../routers";

it("user.me returns null when unauthenticated", async () => {
	const ctx = await createTestContext();
	const caller = appRouter.createCaller(ctx);

	await expect(caller.privateData()).rejects.toThrow("Authentication required");

	const healthCheck = await caller.healthCheck();
	expect(healthCheck).toBe("OK");

	const todos = await caller.todo.getAll();
	expect(Array.isArray(todos)).toBe(true);
	expect(todos).toEqual([]);
});
