import { isDev, isProd } from '@server/constant/env';
import { serverStartedAt } from '@server/constant/server';
import { User } from '@shared/type';

function decoratePageProps<Props extends object>(
  controllerProps: { currentUser: User | undefined },
  pageProps: Props = {} as Props,
) {
  return {
    currentUser: controllerProps.currentUser,
    isDev,
    isProd,
    serverStartedAt,
    ...pageProps,
  };
}

export { decoratePageProps };
