import { DB } from '@shared/type/db';
import { Kysely } from 'kysely';
import { PlanetScaleDialect } from 'kysely-planetscale';

const client = new Kysely<DB>({
  dialect: new PlanetScaleDialect({
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
  }),
});

export { client };
