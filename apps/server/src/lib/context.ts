import type { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";
import { fromNodeHeaders } from "better-auth/node";
import { auth } from "./auth.js";

export async function createContext({ req }: CreateFastifyContextOptions) {
	const headers = req?.headers ? fromNodeHeaders(req.headers) : new Headers();

	const session = await auth.api.getSession({
		headers,
	});

	return { session };
}

export async function createTestContext(headers: Record<string, string> = {}) {
	const session = await auth.api.getSession({
		headers: new Headers(headers),
	});

	return { session };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
