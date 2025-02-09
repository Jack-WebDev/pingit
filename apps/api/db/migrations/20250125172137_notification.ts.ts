import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('notification', (t) => {
        t.text('id').primary().defaultTo(knex.raw('generate_cuid()'));
        t.text('user_id')
            .notNullable()
            .references('id')
            .inTable('user')
            .onDelete('CASCADE');
        t.uuid('ref_id').notNullable();
        t.string('category').notNullable();
        t.string('title').notNullable();
        t.string('message').notNullable();
        t.string('status').notNullable();
        t.timestamps(true, true);
    });

    // raw generated search field
    await knex.raw(`
   ALTER TABLE "notification"
   ADD COLUMN search tsvector GENERATED ALWAYS AS (
     setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
     setweight(to_tsvector('simple', coalesce(message, '')), 'B') :: tsvector
   ) STORED;
 `);

    // index the search field
    await knex.raw(`
    CREATE INDEX notification_search_idx ON "notification" USING GIN(search);
`);
}

export async function down(knex: Knex): Promise<void> {
    await knex.raw(`
  DROP INDEX IF EXISTS notification_search_idx;
  `);
    return await knex.schema.dropTableIfExists('notification');
}
