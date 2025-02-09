import { type CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    schema: './schema.graphql',
    documents: ['src/schema/*.graphql'],
    generates: {
        './src/__generated__/': {
            preset: 'client',
        },
    },
    hooks: { afterAllFileWrite: ['prettier --write'] },
};

export default config;
