import { User } from '~/account';
import { TypeIdentifier } from '~/type';

import { BaseModel } from '@pingit/datakit';

export class Address extends BaseModel {
    static tableName = 'address';
    static typeIdentifier = TypeIdentifier.Address;

    id: string = '';
    userId: string = '';
    streetAddress: string = '';
    country: string = '';
    city: string = '';
    postalCode: string = '';
    user: User | null = null;

    static get relationMappings() {
        return {
            user: {
                relation: BaseModel.HasOneRelation,
                modelClass: User,
                join: {
                    from: 'address.userId',
                    to: 'user.id',
                },
            },
        };
    }
}
