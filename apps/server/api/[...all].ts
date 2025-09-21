import type { VercelRequest, VercelResponse } from "@vercel/node";
import type { FastifyInstance } from "fastify";
import { createServer } from "../src/index.js";

let app: FastifyInstance | null = null;

export const config = {
	api: {
		bodyParser: false,
	},
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
	try {
		if (!app) {
			app = await createServer();
			await app.ready();
		}
		app.server.emit("request", req, res);
	} catch (err) {
		console.error("Fastify boot/dispatch error:", err);
		if (!res.headersSent) {
			res.statusCode = 500;
			res.end("Internal error");
		}
	}
}
