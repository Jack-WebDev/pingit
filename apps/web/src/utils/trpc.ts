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

// Helper function to get the correct API URL
function getBaseUrl() {
	if (typeof window !== "undefined") {
		// Browser should use relative path
		return "";
	}

	// SSR should use vercel url
	if (process.env.VERCEL_URL) {
		return `https://${process.env.VERCEL_URL}`;
	}

	// Development fallback
	return process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";
}

const trpcClient = createTRPCClient<AppRouter>({
	links: [
		httpBatchLink({
			url: `${getBaseUrl()}/trpc`,
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
