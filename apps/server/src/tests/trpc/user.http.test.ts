import type { FastifyInstance } from "fastify";
import request from "supertest";
import { afterAll, beforeAll, expect, it } from "vitest";
import { createServer } from "../../index";

let app: FastifyInstance;
beforeAll(async () => {
	app = await createServer();
	await app.ready();
});
afterAll(async () => {
	await app.close();
});

it("calls trpc procedure over http", async () => {
	const res = await request(app.server).get("/trpc/todo.getAll");
	expect(res.status).toBe(200);

	const data = res.body?.result?.data;
	expect(Array.isArray(data)).toBe(true);
	expect(data).toHaveLength(0);
});
