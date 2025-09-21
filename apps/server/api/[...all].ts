import type { VercelRequest, VercelResponse } from "@vercel/node";
import type { FastifyInstance } from "fastify";
import { createServer } from "../src/index.js";

let app: FastifyInstance | null = null;

export default async function handler(req: VercelRequest, res: VercelResponse) {
	if (!app) {
		app = await createServer();
		await app.ready();
	}

	app.server.emit("request", req, res);
}
