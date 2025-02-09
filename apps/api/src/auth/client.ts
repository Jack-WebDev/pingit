import { BaseModel } from '@pingit/datakit';

export enum ClientScope {
    auth = 'auth',
}

export class Client extends BaseModel {
    static tableName = 'client';
    id: string = '';
    secret: string = '';
    scope: string[] = [];
    name: string = '';

    // constructor(id: string, secret: string, scope: string[], name: string) {
    //   super();
    //   this.id = id;
    //   this.secret = secret;
    //   this.scope = scope;
    //   this.name = name;
    // }
}
