import { ClientScope } from '~/auth/client';

import * as argon from 'argon2';
import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex('client').del();

    // Inserts seed entries
    await knex('client')
        .insert({
            id: '7b19cbd4-d823-4182-99ec-9c6d0f67ffc6',
            secret: await argon.hash(
                '154f60d2afd922d50bc4e384069c5f8267dbf0dec4ced6eeeb52eadd5dd07ffb'
            ),
            name: 'WEB',
            scope: [ClientScope.auth],
        })
        .onConflict('id')
        .ignore();
}
