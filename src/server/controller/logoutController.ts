import { logoutOauthUser } from '@server/operation/logoutOauthUser';
import { getSessionCookie } from '@server/util/controller/getSessionCookie';
import { pageController } from '@server/util/controller/pageController';

const logoutController = pageController(async ({ cookie, set }) => {
  const sessionCookie = await getSessionCookie({ cookie });

  if (sessionCookie.value) {
    await logoutOauthUser({ token: sessionCookie.value.token });
  }

  sessionCookie.remove();

  return (set.redirect = '/');
});

export { logoutController };
