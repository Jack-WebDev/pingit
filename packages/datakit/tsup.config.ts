import { options, defineConfig } from '@pingit/buildkit';

export default defineConfig({
  ...options,
  external: options.external.concat(['pg', 'knex', 'objection', '@pingit/logger']),
});
