import { isDev } from '@server/constant/env';
import Elysia from 'elysia';
import { rateLimit as elysiaRateLimit } from 'elysia-rate-limit';

const rateLimit = isDev
  ? new Elysia()
  : new Elysia().use(elysiaRateLimit({ duration: 60 * 1000, max: 300 }));

export { rateLimit };
