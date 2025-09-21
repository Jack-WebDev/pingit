import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
	baseURL:
		process.env.NEXT_PUBLIC_AUTH_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "",
});
