// import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export const baseConfig = defineConfig({
    // plugins: [tsconfigPaths()],
    test: {
        globals: true,
        setupFiles: [
            '../../packages/serverkit/dist/configure.js',
            '../../packages/testkit/dist/setup.js',
        ],
        include: ['src/**/*.{spec,e2e}.ts'],
        coverage: {
            provider: 'v8', // or 'istanbul' if you prefer
            exclude: ['src/index.ts'],
            all: true,
            thresholds: {
                lines: 80,
                functions: 80,
                branches: 80,
                statements: 80,
            },
        },
    },
});
