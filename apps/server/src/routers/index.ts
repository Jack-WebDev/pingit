import { protectedProcedure, publicProcedure, router } from "../lib/trpc.js";
import { todoRouter } from "./todo.js";

export const appRouter = router({
	healthCheck: publicProcedure.query(() => {
		return "OK";
	}),
	privateData: protectedProcedure.query(({ ctx }) => {
		return {
			message: "This is private",
			user: ctx.session.user,
		};
	}),
	todo: todoRouter,
});
export type AppRouter = typeof appRouter;
