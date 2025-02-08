import { createSeed } from '@pingit/datakit';
import { createObjectMap } from '@pingit/utils';

import { Type } from '~/type/type';

import { types } from './seeds';

export const typeSeeds = createSeed(async (__, _, ctx) => {
  const data = await Type.query(ctx.db).insert(types);

  return createObjectMap(data, ({ identifier }) => identifier);
});
