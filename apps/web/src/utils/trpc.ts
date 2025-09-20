import { QueryCache, QueryClient } from "@tanstack/react-query";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";
import { toast } from "sonner";
import type { AppRouter } from "../../../server/src/routers";

export const queryClient = new QueryClient({
	queryCache: new QueryCache({
		onError: (error) => {
			toast.error(error.message, {
				action: {
					label: "retry",
					onClick: () => {
						queryClient.invalidateQueries();
					},
				},
			});
		},
	}),
});

const TRPC_PATH = process.env.NEXT_PUBLIC_TRPC_PATH ?? "/api/trpc";

/**
 * Returns the absolute base URL for SSR, and either an absolute or relative
 * base URL for the browser depending on whether you're using one or two projects.
 */
function getBaseUrl() {
	// 1) Browser
	if (typeof window !== "undefined") {
		// If you're deploying server as a separate project, set NEXT_PUBLIC_API_URL (e.g., https://your-server.vercel.app)
		// If same project, leave it undefined to use relative fetches.
		return process.env.NEXT_PUBLIC_API_URL ?? "";
	}

	// 2) SSR on Vercel
	if (process.env.VERCEL_URL) {
		const host =
			process.env.NEXT_PUBLIC_API_URL ?? `https://${process.env.VERCEL_URL}`;
		return host;
	}

	// 3) Local dev
	// If server runs separately (e.g. :3001) set NEXT_PUBLIC_SERVER_URL; else default to :3000
	return (
		process.env.NEXT_PUBLIC_API_URL ??
		process.env.NEXT_PUBLIC_SERVER_URL ??
		"http://localhost:3000"
	);
}

const trpcClient = createTRPCClient<AppRouter>({
	links: [
		httpBatchLink({
			url: `${getBaseUrl()}${TRPC_PATH}`,
			fetch(url, options) {
				return fetch(url, {
					...options,
					credentials: "include",
				});
			},
		}),
	],
});

export const trpc = createTRPCOptionsProxy<AppRouter>({
	client: trpcClient,
	queryClient,
});
