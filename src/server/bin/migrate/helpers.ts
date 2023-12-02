import { migrationDir } from '@server/constant/path';
import { client } from '@server/database';
import { promises as fs } from 'fs';
import { FileMigrationProvider, MigrationResultSet, Migrator } from 'kysely';
import path from 'path';

function getMigrator() {
  return new Migrator({
    db: client,
    provider: new FileMigrationProvider({
      fs,
      path,
      migrationFolder: migrationDir,
    }),
  });
}

function applyTransactionHack() {
  // https://github.com/vercel/storage/issues/325
  Object.defineProperty(
    client.getExecutor().adapter,
    'supportsTransactionalDdl',
    () => false,
  );
}

function printMigrationResults({ error, results }: MigrationResultSet) {
  if (results) {
    results.forEach(({ direction, status, migrationName }) => {
      if (status === 'Success') {
        console.log(`Successfully migrated (${direction}): ${migrationName}`);
      } else if (status === 'Error') {
        console.error(`Failed to migrate (${direction}): ${migrationName}`);
      } else if (status === 'NotExecuted') {
        console.log(`Migration not executed (${direction}): ${migrationName}`);
      }
    });
  }

  if (error) {
    console.error(error);
  }
}

export { applyTransactionHack, getMigrator, printMigrationResults };
