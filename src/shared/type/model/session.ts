// eslint-disable-next-line no-restricted-imports
import type { Session as SessionTable } from '@shared/type/db/generated';
import { Insertable, Selectable, Updateable } from 'kysely';

export type Session = Selectable<SessionTable>;
export type NewSession = Insertable<SessionTable>;
export type SessionUpdate = Updateable<SessionTable>;

export { SessionTable };
