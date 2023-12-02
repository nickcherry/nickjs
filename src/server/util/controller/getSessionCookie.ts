import { SessionCookieValue } from '@shared/type/controller/auth';
import { Cookie } from 'elysia';

function getSessionCookie({
  cookie,
}: {
  cookie: Record<string, Cookie<unknown>>;
}) {
  return cookie.session as Cookie<SessionCookieValue | null>;
}

export { getSessionCookie };
