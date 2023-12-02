// eslint-disable-next-line no-restricted-imports
import {
  bootstrapCacheDurationInSeconds,
  fingerprint,
} from '@server/constant/cache';
// eslint-disable-next-line no-restricted-imports
import { srcDir } from '@server/constant/path';

const bootstrapFilenamePrefix = '____bootstrap.';
const reactBaseFilename = '____bootstrap.react';

const bootstrapRelativeSrcPathParam = 'relativeSrcPath';
const bootstrapSrcImportNameParam = 'srcImportName';
const bootstrapFingerprintParam = 'fingerprint';

const bootstrapFunctionName = '____bootstrap';
const bootstrapScriptClassName = 'bootstrap';

const reactRoutePath = '/public/bootstrap-react';
const bootstrapRoutePath = '/public/bootstrap';

export {
  bootstrapCacheDurationInSeconds,
  bootstrapFilenamePrefix,
  bootstrapFingerprintParam,
  bootstrapFunctionName,
  bootstrapRelativeSrcPathParam,
  bootstrapRoutePath,
  bootstrapScriptClassName,
  bootstrapSrcImportNameParam,
  fingerprint,
  reactBaseFilename,
  reactRoutePath,
  srcDir,
};
