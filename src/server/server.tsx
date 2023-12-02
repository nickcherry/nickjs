import '@total-typescript/ts-reset';

import { githubAuthCallbackController } from '@server/controller/api/auth/githubAuthCallbackController';
import { pingController } from '@server/controller/api/pingController';
import { homeController } from '@server/controller/homeController';
import { loginController } from '@server/controller/loginController';
import { logoutController } from '@server/controller/logoutController';
import { userController } from '@server/controller/userController';
import { usersController } from '@server/controller/usersController';
import { auth } from '@server/plugin/auth';
import { error } from '@server/plugin/error';
import { gzip } from '@server/plugin/gzip';
import { publicAssets } from '@server/plugin/publicAssets';
import { rateLimit } from '@server/plugin/rateLimit';
import { secureHeaders } from '@server/plugin/secureHeaders';
import { tailwind } from '@server/plugin/tailwind';
import { githubAuthCallbackSchema } from '@shared/type/controller/auth';
import { userSchema } from '@shared/type/controller/user';
import { ssr } from '@ssr/elysia';
import Elysia from 'elysia';
import { requestID } from 'elysia-requestid';

const server = new Elysia()
  .use(requestID())
  .use(secureHeaders)
  .use(rateLimit)
  .use(publicAssets)
  .use(error)
  .use(tailwind)
  .use(auth)
  .use(ssr)
  .use(gzip)
  .get('/', homeController)
  .get('/login', loginController)
  .post('/logout', logoutController)
  .get('/users', usersController)
  .get('/users/:id', userController, userSchema)
  .get('api/ping', pingController)
  .get(
    'api/auth/callback/github',
    githubAuthCallbackController,
    githubAuthCallbackSchema,
  );

export { server };
