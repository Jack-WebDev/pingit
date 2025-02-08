import { defineConfig, options } from '@pingit/buildkit';

const external = options.external.concat(['vite-tsconfig-paths']);

export default defineConfig({
  ...options,
  external,
});
