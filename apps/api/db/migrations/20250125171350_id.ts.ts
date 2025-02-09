import { Knex } from 'knex';

export async function up(knex: Knex) {
    await knex.raw(`
    CREATE OR REPLACE FUNCTION generate_cuid() RETURNS text
    LANGUAGE plpgsql
    AS $$
    DECLARE
        timestamp_part text;
        counter_part text;
        random_part text;
    BEGIN
        -- Timestamp part (time in milliseconds since Unix epoch, converted to base-36)
        timestamp_part := to_char(now(), 'YYYYMMDDHH24MISS') || lpad(floor(extract(milliseconds FROM clock_timestamp()))::text, 3, '0');

        -- Random part (10 characters, base-36)
        random_part := encode(gen_random_bytes(6), 'hex');

        -- Combine parts into the final CUID-like identifier
        RETURN 'c' || timestamp_part || random_part;
    END;
    $$;
  `);
}

export async function down(knex: Knex) {
    await knex.raw(`
    DROP FUNCTION IF EXISTS generate_cuid;
  `);
}
