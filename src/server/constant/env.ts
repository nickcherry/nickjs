import { MissingEnvVarError } from '@server/type/error';

const getOptionalValue = (key: string) => Bun.env[key];

const getValue = (key: string) => {
  const value = getOptionalValue(key);

  if (!value) {
    throw new MissingEnvVarError({ key });
  }

  return value;
};

const isProd = getOptionalValue('NODE_ENV') === 'production';
const isDev = !isProd;

const port = getOptionalValue('PORT') || 3000;

const databaseHost = getValue('DATABASE_HOST');
const databaseUsername = getValue('DATABASE_USERNAME');
const databasePassword = getValue('DATABASE_PASSWORD');
const databaseUrl = `mysql://${databaseUsername}:${databasePassword}@${databaseHost}?ssl={"rejectUnauthorized":true}`;

const githubClientId = getValue('GITHUB_CLIENT_ID');
const githubSecret = getValue('GITHUB_SECRET');

export {
  databaseHost,
  databasePassword,
  databaseUrl,
  databaseUsername,
  githubClientId,
  githubSecret,
  isDev,
  isProd,
  port,
};
