import { env, initConfig } from '@pingit/serverkit';

const cwd = process.cwd();
const conf = initConfig(cwd);

const builder = {
    ...conf,
    stage: env.get('STAGE').required().asEnum(['dev', 'prod', 'test', 'uat']),
    debug: {
        level: env
            .get('DEBUG_LEVEL')
            .default(conf.env === 'development' ? 'debug' : 'info')
            .asEnum([
                'fatal',
                'error',
                'warn',
                'info',
                'debug',
                'trace',
                'silent',
            ]),
    },
};

export const baseConfig = Object.freeze(builder);
export type BaseConfig = typeof builder;
export type Stage = BaseConfig['stage'];
