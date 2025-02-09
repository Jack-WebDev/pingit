import { defineConfig, options } from '@pingit/buildkit';

export default defineConfig({
    ...options,
    external: options.external.concat([
        'pg',
        'knex',
        'objection',
        '@pingit/logger',
    ]),
});
