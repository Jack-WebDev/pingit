import { initConfig, env } from '@pingit/serverkit';
const root = globalThis.process.cwd();

const conf = initConfig(root);

let envConfig = undefined;

if (conf.env !== 'production') {
    envConfig = {
        API_URL: env.get('API_URL').required().asString(),
        CLIENT_ID: env.get('CLIENT_ID').required().asString(),
        CLIENT_SECRET: env.get('CLIENT_SECRET').required().asString(),
    };
}

export default {
    env: envConfig,
    reactStrictMode: true,
    transpilePackages: ['ui'],

    webpack: (config) => {
        config.resolve.alias.canvas = false;
        config.resolve.alias.encoding = false;
        config.module.rules.push({
            test: /\.node$/,
            use: {
                loader: 'node-loader',
            },
        });

        return config;
    },
};



