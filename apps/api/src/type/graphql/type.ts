import { builder } from '~/graphql/builder';

import { TypeIdentifier } from '../type';

export const TypeIdentifierType = builder.enumType(TypeIdentifier, {
    name: 'TypeIdentifier',
    description: 'TypeIdentifier',
});
