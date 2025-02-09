import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('contact', (t) => {
        t.text('id').primary().defaultTo(knex.raw('generate_cuid()'));
        t.text('user_id')
            .references('id')
            .inTable('user')
            .notNullable()
            .onDelete('CASCADE');
        t.string('email').notNullable().unique();
        t.string('mobile_number').notNullable().unique();
        t.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
    return await knex.schema.dropTableIfExists('contact');
}
