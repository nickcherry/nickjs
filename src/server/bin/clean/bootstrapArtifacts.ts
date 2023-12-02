import { readdir, unlink } from 'node:fs/promises';
import { join } from 'node:path';

import { srcDir } from '@server/constant/path';
import { bootstrapFilenamePrefix } from '@ssr/config';

async function cleanBootstrapArtifacts() {
  const traverse = async (path: string) => {
    const filesOrFolders = await readdir(path, { withFileTypes: true });
    filesOrFolders.forEach(async (fileOrFolder) => {
      const fileOrFolderPath = join(path, fileOrFolder.name);
      if (fileOrFolder.isDirectory()) {
        traverse(fileOrFolderPath);
      } else if (fileOrFolder.name.startsWith(bootstrapFilenamePrefix)) {
        // Just to be safe
        if (!fileOrFolderPath.includes('___')) {
          throw new Error(
            `Aborting: File may not actually be disposable: ${fileOrFolderPath}`,
          );
        }
        unlink(fileOrFolderPath);
      }
    });
  };

  traverse(srcDir);
}

cleanBootstrapArtifacts();
