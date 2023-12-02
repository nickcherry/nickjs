// eslint-disable-next-line no-restricted-imports
import type { User as UserTable } from '@shared/type/db/generated';
import { Insertable, Selectable, Updateable } from 'kysely';

export type User = Selectable<UserTable>;
export type NewUser = Insertable<UserTable>;
export type UserUpdate = Updateable<UserTable>;

export { UserTable };
