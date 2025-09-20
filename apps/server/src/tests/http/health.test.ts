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

it("GET /health -> 200", async () => {
	const res = await request(app.server).get("/health");
	expect(res.status).toBe(200);
	expect(res.body).toEqual({ ok: true });
});
