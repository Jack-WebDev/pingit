import { cookies as nextCookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { GraphQLClient } from 'graphql-request';

export type Options = {
    baseURL: string;
    clientId: string;
    secret: string;
};

export class ApiClient {
    public baseURL: string;
    private readonly clientId: string;
    private readonly secret: string;
    constructor(
        options: Options,
        private readonly cookies: typeof nextCookies
    ) {
        Object.assign(this, options);
        this.baseURL = options.baseURL;
        this.clientId = options.clientId;
        this.secret = options.secret;
    }

    private getClient(token: string) {
        return new GraphQLClient(`${this.baseURL}/graphql`, {
            headers: {
                authorization: token,
            },
        });
    }

    private get basicClient() {
        const token = Buffer.from(`${this.clientId}:${this.secret}`).toString(
            'base64'
        );

        const header = `Basic ${token}`;

        return this.getClient(header);
    }

    private async getAuthClient() {
        const cookies = await this.cookies();
        const token = cookies.get('token');

        if (!token) {
            redirect('/');
        }

        const header = `Bearer ${token.value}`;

        return this.getClient(header);
    }
}
