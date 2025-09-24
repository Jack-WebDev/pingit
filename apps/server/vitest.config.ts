import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		environment: "node",
		include: [
			"src/**/*.test.{ts,tsx}",
			"tests/**/*.test.{ts,tsx}",
			"**/*.test.{ts,tsx}",
			"**/__tests__/**/*.{ts,tsx}",
		],
		globals: true,
		setupFiles: ["./src/tests/setup/global.ts"],
		globalSetup: ["./src/tests/setup/global-setup.ts"],
		coverage: {
			provider: "v8",
			reporter: ["text", "html", "lcov"],
			reportsDirectory: "./coverage",
		},
		poolOptions: {
			threads: { singleThread: true },
		},
		passWithNoTests: true,
	},
});
