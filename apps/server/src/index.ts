import fastifyCors from "@fastify/cors";
import {
	type FastifyTRPCPluginOptions,
	fastifyTRPCPlugin,
} from "@trpc/server/adapters/fastify";
import Fastify from "fastify";
import { auth } from "./lib/auth.js";
import { createContext } from "./lib/context.js";
import { type AppRouter, appRouter } from "./routers/index.js";
import "dotenv/config";

const ALLOWED_ORIGINS = [
	process.env.CORS_ORIGIN,
	"http://localhost:3001",
].filter(Boolean);

// const isAllowed = (o?: string) => !!o && ALLOWED_ORIGINS.includes(o);

// const baseCorsConfig = {
//   origin: (
//     origin: string | undefined,
//     cb: (err: Error | null, allowed: boolean) => void
//   ) => {
//     if (!origin) return cb(null, true);
//     cb(null, ALLOWED_ORIGINS.includes(origin));
//   },
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
//   credentials: true,
//   maxAge: 86400,
//   strictPreflight: false,
// };

export async function createServer() {
	const fastify = Fastify({
		logger: process.env.NODE_ENV === "development",
		trustProxy: true,
	});

	await fastify.register(fastifyCors, {
		origin: (origin, cb) => {
			if (!origin) return cb(null, true);
			cb(null, ALLOWED_ORIGINS.includes(origin));
		},
		credentials: true,
		allowedHeaders: ["*"],
		methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
		maxAge: 86400,
	});

	fastify.route({
		method: ["GET", "POST"],
		url: "/api/auth/*",
		async handler(request, reply) {
			try {
				const url = new URL(
					request.url,
					`${request.protocol}://${request.hostname}`,
				);
				request.log.info({ builtUrl: url.toString() }, "Auth URL base");

				const headers = new Headers();
				Object.entries(request.headers).forEach(([key, value]) => {
					if (value) headers.append(key, value.toString());
				});
				const req = new Request(url.toString(), {
					method: request.method,
					headers,
					body: request.body ? JSON.stringify(request.body) : undefined,
				});
				const response = await auth.handler(req);
				reply.status(response.status);
				response.headers.forEach((value, key) => {
					reply.header(key, value);
				});
				reply.send(response.body ? await response.text() : null);
			} catch (error) {
				fastify.log.error({ err: error }, "Authentication Error:");
				reply.status(500).send({
					error: "Internal authentication error",
					code: "AUTH_FAILURE",
				});
			}
		},
	});

	await fastify.register(fastifyTRPCPlugin, {
		prefix: "/api/trpc",
		trpcOptions: {
			router: appRouter,
			createContext,
			onError({ path, error }) {
				console.error(`Error in tRPC handler on path '${path}':`, error);
			},
		} satisfies FastifyTRPCPluginOptions<AppRouter>["trpcOptions"],
	});

	fastify.get("/api/health", async () => {
		return { ok: true };
	});

	fastify.get("/api/auth/test", async (request, reply) => {
		reply.send({
			message: "Auth route is working",
			url: request.url,
			method: request.method,
		});
	});

	return fastify;
}

export async function startServer() {
	const app = await createServer();

	return new Promise<typeof app>((resolve, reject) => {
		app.listen(
			{ port: Number(process.env.API_PORT), host: "0.0.0.0" },
			(err) => {
				if (err) {
					reject(err);
				} else {
					console.log(`Server running on port ${process.env.API_PORT}`);
					resolve(app);
				}
			},
		);
	});
}
