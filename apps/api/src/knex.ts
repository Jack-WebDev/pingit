import { baseConfig } from '~/config/base';
import { databaseConfig as config } from '~/config/db';
import { logger } from '~/logger';

import { Knex } from 'knex';
// @ts-ignore
import knexStringCase from 'knex-stringcase';
import { resolve } from 'path';

const root = process.cwd();

export const knexConfig: Knex.Config = {
    client: 'pg',
    connection: config.url,
    debug: baseConfig.debug.level === 'debug',
    pool: { min: 1, max: config.pool },
    log: {
        warn(message: string) {
            logger.warn(message);
        },
        error(message: string) {
            logger.error(message);
        },
        deprecate(message: string) {
            logger.info(message);
        },
        debug(message: string) {
            logger.debug(message);
        },
    },
    migrations: {
        directory: resolve(root, 'db/migrations'),
    },
    seeds: {
        directory: resolve(root, 'db/seeds'),
    },
};

// Wrap the configuration with knexStringCase
export const knexfile = knexStringCase({
    client: 'pg',
    connection: config.url,
    debug: baseConfig.debug.level === 'debug',
    pool: { min: 1, max: config.pool },
    log: {
        warn(message: string) {
            logger.warn(message);
        },
        error(message: string) {
            logger.error(message);
        },
        deprecate(message: string) {
            logger.info(message);
        },
        debug(message: string) {
            logger.debug(message);
        },
    },
    migrations: {
        directory: resolve(root, 'db/migrations'),
    },
    seeds: {
        directory: resolve(root, 'db/seeds'),
    },
});
