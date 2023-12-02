import Elysia from 'elysia';
import { helmet } from 'elysia-helmet';
import { HelmetOptions } from 'helmet';

const helmetOptions: HelmetOptions = {
  contentSecurityPolicy: false,
};

const secureHeaders = new Elysia().use(helmet(helmetOptions));

export { secureHeaders };
