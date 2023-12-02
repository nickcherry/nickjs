import { join, relative } from 'node:path';

import { projectDir as templateDir } from '@server/constant/path';
import { cp, mkdir, readdir } from 'fs/promises';

async function createNewProject({
  projectDir,
  projectName,
}: {
  projectDir: string;
  projectName: string;
}) {
  const foldersToSkip: RegExp[] = [
    new RegExp('/.git/?$'),
    new RegExp('/.github/?$'),
    new RegExp(`${templateDir}/node_modules/?$`),
    new RegExp('/src/cli/?$'),
    new RegExp(`${projectDir}`),
  ];
  const filesToSkip: RegExp[] = [
    new RegExp('.DS_Store'),
    new RegExp('.env.local$'),
  ];

  const shouldSkip = ({
    path,
    isDirectory,
  }: {
    path: string;
    isDirectory: boolean;
  }) => {
    const skipList = isDirectory ? foldersToSkip : filesToSkip;
    return skipList.some((skipPattern) => {
      return skipPattern.test(path);
    });
  };

  await mkdir(projectDir, { recursive: true });

  const traverse = async (basePath: string) => {
    for (const item of await readdir(basePath, { withFileTypes: true })) {
      const templatePath = join(basePath, item.name);
      const path = join(projectDir, relative(templateDir, templatePath));
      const isDirectory = item.isDirectory();

      if (shouldSkip({ path: templatePath, isDirectory })) {
        continue;
      }

      if (isDirectory) {
        await mkdir(path);
        await traverse(templatePath);
      } else {
        if (path.endsWith('.code-workspace')) {
          await cp(
            templatePath,
            path.replace(
              'nickjs.code-workspace',
              `${projectName}.code-workspace`,
            ),
          );
        } else {
          await cp(templatePath, path);
        }
      }
    }
  };

  await traverse(templateDir);

  const packagePath = join(projectDir, 'package.json');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const packageContent: any = JSON.parse(await Bun.file(packagePath).text());

  packageContent.name = projectName;
  packageContent.version = '0.0.1';

  delete packageContent['author'];
  delete packageContent['bin'];
  delete packageContent['keywords'];
  delete packageContent['license'];
  delete packageContent['main'];
  delete packageContent['repository'];
  delete packageContent.dependencies['chalk'];
  delete packageContent.devDependencies['@types/chalk'];

  Bun.write(packagePath, JSON.stringify(packageContent, null, 2));

  await cp(
    join(templateDir, '.env.local.template'),
    join(projectDir, '.env.local'),
  );
}

export { createNewProject };
