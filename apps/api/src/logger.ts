import { Logger as BaseLogger, createLogger } from '@pingit/serverkit';

import { config } from './config';

export type Logger = BaseLogger;

export const logger: Logger = createLogger({
    name: 'api',
    level: config.debug.level,
    pretty: config.env === 'development',
});
