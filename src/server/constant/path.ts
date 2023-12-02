import { join, normalize } from 'path';

const projectDir = normalize(join(import.meta.dir, '..', '..', '..'));
const srcDir = join(projectDir, 'src');
const clientDir = join(srcDir, 'client');
const serverDir = join(srcDir, 'server');

const publicSrcDir = join(projectDir, 'public');

const tailwindConfigPath = join(projectDir, 'tailwind.config.ts');
const tailwindSourcePath = join(srcDir, 'global.css');

const publicPath = '/';
const compiledCssPath = '/style.css';

const migrationDir = join(serverDir, 'database', 'migration');

export {
  clientDir,
  compiledCssPath,
  migrationDir,
  projectDir,
  publicPath,
  publicSrcDir,
  serverDir,
  srcDir,
  tailwindConfigPath,
  tailwindSourcePath,
};
