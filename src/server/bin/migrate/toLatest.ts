import { client } from '@server/database/client';

import {
  applyTransactionHack,
  getMigrator,
  printMigrationResults,
} from './helpers';

async function toLatest() {
  applyTransactionHack();

  const migrator = getMigrator();

  const results = await migrator.migrateToLatest();
  printMigrationResults(results);

  await client.destroy();
}

toLatest();
