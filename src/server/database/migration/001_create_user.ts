import { DB } from '@shared/type/db';
import { Kysely, sql } from 'kysely';

const table = 'User';

export async function up(db: Kysely<DB>): Promise<void> {
  await db.schema
    .createTable(table)
    .addColumn('id', 'varchar(255)', (col) => col.primaryKey())
    .addColumn('name', 'varchar(255)', (col) => col.notNull())
    .addColumn('avatarUrl', 'varchar(255)')
    .addColumn('createdAt', 'timestamp', (col) =>
      col.defaultTo(sql`now()`).notNull(),
    )
    .execute();
}

export async function down(db: Kysely<DB>): Promise<void> {
  await db.schema.dropTable(table).execute();
}
