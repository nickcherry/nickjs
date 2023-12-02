// eslint-disable-next-line no-restricted-imports
import type { Oauth as OauthTable } from '@shared/type/db/generated';
import { Insertable, Selectable, Updateable } from 'kysely';

export type Oauth = Selectable<OauthTable>;
export type NewOauth = Insertable<OauthTable>;
export type OauthUpdate = Updateable<OauthTable>;

export { OauthTable };
