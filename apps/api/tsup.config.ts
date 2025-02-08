import { options, defineConfig } from '@pingit/buildkit';

export default defineConfig({
  ...options,
  dts: false,
  external: options.external.concat(['esbuild', '@pingit/testkit','tsconfig-paths']),
  format: ['cjs'],
  entry: ['src/index.ts', 'db/**/*.ts'],
});
