import { rule } from 'graphql-shield';
import { Context } from '~/context';

export const isActiveUser = rule({ cache: 'contextual' })(async (parent, args, ctx: Context) => {
  return ctx.auth.isActiveUser();
});

