import { join } from 'node:path';

import { databaseUrl } from '@server/constant/env';
import { srcDir } from '@ssr/config';
import { spawnSync } from 'bun';

async function generateDbTypes() {
  const outFile = join(srcDir, 'shared/type/db/generated.ts');

  spawnSync(
    [
      'bun',
      'x',
      'kysely-codegen',
      `--url=${databaseUrl}`,
      `--out-file=${outFile}`,
      '--dialect=mysql',
    ],
    {
      stdio: ['inherit', 'inherit', 'inherit'],
    },
  );
}

generateDbTypes();
