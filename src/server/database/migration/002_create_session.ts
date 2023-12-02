import { DB } from '@shared/type/db';
import { Kysely, sql } from 'kysely';

const sessionTable = 'Session';
const sessionTokenIndex = 'sessionTokenIndex';

export async function up(db: Kysely<DB>): Promise<void> {
  await db.schema
    .createTable(sessionTable)
    .addColumn('id', 'varchar(255)', (col) => col.primaryKey())
    .addColumn('userId', 'varchar(255)', (col) =>
      col.notNull().references('User.id').onDelete('cascade'),
    )
    .addColumn('token', 'varchar(255)', (col) => col.unique().notNull())
    .addColumn('createdAt', 'timestamp', (col) =>
      col.defaultTo(sql`now()`).notNull(),
    )
    .execute();

  await db.schema
    .createIndex(sessionTokenIndex)
    .on(sessionTable)
    .column('token')
    .execute();
}

export async function down(db: Kysely<DB>): Promise<void> {
  await db.schema.dropIndex(sessionTokenIndex).on(sessionTable).execute();
  await db.schema.dropTable(sessionTable).execute();
}
