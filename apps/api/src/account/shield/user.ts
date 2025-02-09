import { Context } from '~/context';

import { rule } from 'graphql-shield';

export const isActiveUser = rule({ cache: 'contextual' })(async (
    parent,
    args,
    ctx: Context
) => {
    return ctx.auth.isActiveUser();
});
