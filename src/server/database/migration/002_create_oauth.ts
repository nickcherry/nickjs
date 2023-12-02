import { DB } from '@shared/type/db';
import { Kysely, sql } from 'kysely';

const table = 'Oauth';
const compoundKey = 'oauthProviderAndUserId';

export async function up(db: Kysely<DB>): Promise<void> {
  await db.schema
    .createTable(table)
    .addColumn('id', 'varchar(255)', (col) => col.primaryKey())
    .addColumn('userId', 'varchar(255)', (col) =>
      col.notNull().references('User.id').onDelete('cascade'),
    )
    .addColumn('providerName', 'varchar(255)', (col) => col.notNull())
    .addColumn('providerUserId', 'varchar(255)', (col) => col.notNull())
    .addColumn('createdAt', 'timestamp', (col) =>
      col.defaultTo(sql`now()`).notNull(),
    )
    .execute();

  await db.schema
    .createIndex(compoundKey)
    .on(table)
    .columns(['providerName', 'providerUserId'])
    .execute();
}

export async function down(db: Kysely<DB>): Promise<void> {
  await db.schema.dropIndex(compoundKey).on(table).execute();
  await db.schema.dropTable(table).execute();
}
