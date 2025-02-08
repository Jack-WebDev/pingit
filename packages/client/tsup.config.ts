import { defineConfig, options } from '@pingit/buildkit';

export default defineConfig({
  ...options,
  external: ['next'],
});
