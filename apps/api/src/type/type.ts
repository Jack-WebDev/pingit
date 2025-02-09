import { BaseModel } from '@pingit/datakit';

export enum TypeIdentifier {
    User = 'User',
    Requisition = 'Requisition',
    Address = 'Address',
    Contact = 'Contact',
    Notification = 'Notification',
}

export class Type extends BaseModel {
    static tableName = 'type';

    id: string;
    identifier: TypeIdentifier;

    constructor(id: string, identifier: TypeIdentifier) {
        super();
        this.id = id;
        this.identifier = identifier;
    }
}
