import { ErrorPage } from '@client/page/ErrorPage';
import { isDev, isProd } from '@server/constant/env';
import { serverStartedAt } from '@server/constant/server';
import { ControllerProps } from '@shared/type/controller/common';
import { clientRoot } from '@ssr/app/clientRoot';
import Elysia from 'elysia';

const error: Elysia = new Elysia({ name: 'error' }).onError((props) => {
  const { currentUser } = props as unknown as ControllerProps;

  return clientRoot(ErrorPage, {
    code: props.code,
    currentUser,
    error: isDev
      ? {
          name: props.error.name,
          message: props.error.message,
          stack: props.error.stack,
        }
      : undefined,
    isDev,
    isProd,
    serverStartedAt,
  });
});

export { error };
