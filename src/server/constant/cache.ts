import { isProd } from './env';

const oneWeek = 60 * 60 * 24 * 7;

const fingerprint = String(Date.now());

const publicCacheDurationInSeconds = oneWeek;
const bootstrapCacheDurationInSeconds = isProd ? oneWeek : 0;
const cssCacheDurationInSeconds = isProd ? oneWeek : 0;

export {
  bootstrapCacheDurationInSeconds,
  cssCacheDurationInSeconds,
  fingerprint,
  publicCacheDurationInSeconds,
};
