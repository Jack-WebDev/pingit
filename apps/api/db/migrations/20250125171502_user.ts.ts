import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('user', (t) => {
        t.text('id').primary().defaultTo(knex.raw('generate_cuid()'));
        t.string('name').notNullable();
        t.string('middle_name').nullable();
        t.increments('sequence').notNullable().unique();
        t.string('surname').notNullable();
        t.specificType('email', 'citext').notNullable().unique();
        t.string('title').nullable();
        t.string('race').nullable();
        t.string('gender').nullable();
        t.date('birth_date').nullable();
        t.string('id_number').nullable().unique();
        t.string('password').nullable();
        t.string('status').notNullable().defaultTo('Active');
        t.timestamps(true, true);
    });

    await knex.raw(`
    ALTER TABLE "user"
    ADD COLUMN search tsvector GENERATED ALWAYS AS (
      setweight(to_tsvector('simple', coalesce(name, '')), 'A') ||
      setweight(to_tsvector('simple', coalesce(surname, '')), 'B') ||
      setweight(to_tsvector('simple', coalesce(id_number, '')), 'C') ||
      setweight(to_tsvector('simple', coalesce(email, '')), 'D') :: tsvector
    ) STORED;
  `);

    await knex.raw(`
    CREATE INDEX user_search_idx ON "user" USING GIN(search);
  `);
}

export async function down(knex: Knex): Promise<void> {
    // drop the index
    await knex.raw(`
  DROP INDEX IF EXISTS user_search_idx;
  `);

    await knex.schema.dropTable('user');
}
