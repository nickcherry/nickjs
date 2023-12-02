import { findSessionUser } from '@server/operation/auth/findSessionUser';
import { SessionCookieValue } from '@shared/type/controller/auth';
import { User } from '@shared/type/model/user';
import Elysia from 'elysia';

const auth = new Elysia({ name: 'auth' })
  .state('currentUser', undefined as User | undefined)
  .derive(async ({ cookie, request }) => {
    let currentUser: User | undefined;

    const lastPathSegment = request.url.split('/').pop();

    if (!lastPathSegment?.includes('.') && cookie.session?.value) {
      const { token } = cookie.session.value as SessionCookieValue;
      currentUser = await findSessionUser({ token });
    }

    return { currentUser };
  });

export { auth };
