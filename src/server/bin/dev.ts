import { watch } from 'node:fs/promises';
import { basename } from 'node:path';

import { projectDir, srcDir } from '@server/constant/path';
import { bootstrapFilenamePrefix } from '@ssr/config';
import { spawn, Subprocess } from 'bun';
import terminate from 'terminate';

let child: Subprocess<'inherit'> | undefined;

(async () => {
  const watcher = watch(srcDir, { recursive: true });

  for await (const event of watcher) {
    if (!basename(event.filename).startsWith(bootstrapFilenamePrefix)) {
      restartServer();
    }
  }
})();

async function restartServer() {
  if (child) {
    terminate(child.pid);
  }

  child = spawn(['bun', 'serve'], {
    cwd: projectDir,
    stdio: ['inherit', 'inherit', 'inherit'],
  });
}

restartServer();
