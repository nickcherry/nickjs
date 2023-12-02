import { StaticSchema } from '@shared/type/controller/common';
import { t } from 'elysia';

export type SessionCookieValue = { token: string };

export const githubAuthCallbackSchema = {
  query: t.Object({ code: t.String() }),
};

export type GithubAuthCallbackSchema = StaticSchema<
  typeof githubAuthCallbackSchema
>;
