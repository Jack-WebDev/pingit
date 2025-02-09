import { Cache } from '~/interface';

import { InMemoryCache } from './InMemoryCache';
import { RedisCache } from './RedisCache';

const providers: Record<string, ((uri: string) => Promise<Cache>) | undefined> =
    {
        redis: (uri) => RedisCache.fromURI(uri),
        memory: () => Promise.resolve(new InMemoryCache()),
    };

export class CacheProvider {
    static fromURI(uri: string) {
        const protocol = uri.split('://')[0] || 'memory';

        const createCache = providers[protocol];

        if (!createCache) {
            throw new Error(
                `Unsupported protocol: ${protocol}. Supported protocols are: ${Object.keys(providers).join(', ')}`
            );
        }

        return createCache(uri);
    }
}
