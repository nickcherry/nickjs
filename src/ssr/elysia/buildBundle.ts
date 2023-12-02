import { exists, unlink } from 'node:fs/promises';
import { dirname } from 'node:path';

import { BuildOutput, BunPlugin } from 'bun';

async function buildBundle({
  external,
  minify = true,
  plugins,
  srcContent,
  srcPath,
}: {
  external?: string[];
  minify?: boolean;
  plugins?: BunPlugin[];
  srcContent: string;
  srcPath: string;
}) {
  const outDir = dirname(srcPath);
  const bundlePath = srcPath.replace(/\.tsx$/, '.js');

  try {
    await Bun.write(srcPath, srcContent);

    const build = async (numAttempts: number = 0): Promise<BuildOutput> => {
      const result = await Bun.build({
        entrypoints: [srcPath],
        external,
        minify,
        outdir: outDir,
        plugins,
      });

      if (!result.success && numAttempts === 0) {
        return build(numAttempts + 1);
      }

      return result;
    };

    const buildOutput = await build();

    if (!buildOutput.success) {
      console.log(buildOutput);
      throw new BundleError({
        bundlePath,
        external,
        message: buildOutput.logs.join('\n'),
        outDir,
        srcContent,
        srcPath,
      });
    }
    const bundleContent = await Bun.file(bundlePath).text();

    return { bundleContent, bundlePath };
  } catch (error) {
    throw new BundleError({
      bundlePath,
      external,
      message: (error as Error).message || String(error),
      outDir,
      srcContent,
      srcPath,
    });
  } finally {
    deleteFile(srcPath);
    deleteFile(bundlePath);
  }
}

async function deleteFile(path: string) {
  if (await exists(path)) {
    await unlink(path);
  }
}

export class BundleError extends Error {
  readonly bundlePath: string;
  readonly external?: string[];
  readonly outDir: string;
  readonly srcContent: string;
  readonly srcPath: string;

  constructor({
    bundlePath,
    external,
    message,
    outDir,
    srcContent,
    srcPath,
  }: {
    bundlePath: string;
    external?: string[];
    message: string;
    outDir: string;
    srcContent: string;
    srcPath: string;
  }) {
    super(`Could not build bundle: ${message}`);
    this.bundlePath = bundlePath;
    this.external = external;
    this.outDir = outDir;
    this.srcContent = srcContent;
    this.srcPath = srcPath;
  }
}

export { buildBundle };
