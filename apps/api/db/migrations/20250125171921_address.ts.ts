import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('address', (t) => {
        t.text('id').primary().defaultTo(knex.raw('generate_cuid()'));
        t.text('user_id')
            .references('id')
            .inTable('user')
            .notNullable()
            .onDelete('CASCADE');
        t.string('address_type').notNullable();
        t.string('street_address').notNullable();
        t.string('country').notNullable();
        t.string('city').notNullable();
        t.string('postal_code').notNullable();
        t.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
    return await knex.schema.dropTableIfExists('address');
}
