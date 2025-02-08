import { baseConfig, mergeConfig } from '@pingit/testkit';

export default mergeConfig(baseConfig, {
  test: {
    globalSetup: ['src/test/globalSetup.ts'],
    reporter: 'verbose',
    coverage: {
      exclude: [
        'db/migrations/**/*',
        'db/seeds/**/*',
        'src/test/globalSetup.ts',
        'src/tables.d.ts',
        'src/express.ts',
        'knexfile.ts',
        'src/config/index.ts',
        'src/middleware',
      ],
    },
  },
});
