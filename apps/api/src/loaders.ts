import { loadTypesById, loadTypesByIdentifier } from '~/type/loaders';

import { Context } from './context';

export function createLoaders(ctx: Context) {
    return {
        types: {
            byId: loadTypesById(ctx),
            byIdentifier: loadTypesByIdentifier(ctx),
        },
    };
}

export type Loaders = ReturnType<typeof createLoaders>;
