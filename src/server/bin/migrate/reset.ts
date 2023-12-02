import { client } from '@server/database/client';

// import { NO_MIGRATIONS } from 'kysely';
import {
  applyTransactionHack,
  // getMigrator,
  // printMigrationResults,
} from './helpers';

async function reset() {
  applyTransactionHack();
  // const migrator = getMigrator();

  // const results = await migrator.migrateTo(NO_MIGRATIONS);
  // printMigrationResults(results);

  await client.schema.dropTable('Session').execute();
  await client.schema.dropTable('User').execute();
  await client.schema.dropTable('Oauth').execute();
  await client.schema.dropTable('kysely_migration').execute();
  await client.schema.dropTable('kysely_migration_lock').execute();

  client.destroy();
}

reset();
