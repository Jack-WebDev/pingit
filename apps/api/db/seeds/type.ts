import { types } from '~/type/seeds';

import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex('type').del();

    // Inserts seed entries
    await knex('type').insert(types).onConflict('identifier').ignore();
}
