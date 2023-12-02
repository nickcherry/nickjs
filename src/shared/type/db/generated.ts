import type { ColumnType } from 'kysely';

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export interface Oauth {
  createdAt: Generated<Date>;
  id: string;
  providerName: string;
  providerUserId: string;
  userId: string;
}

export interface Session {
  createdAt: Generated<Date>;
  id: string;
  token: string;
  userId: string;
}

export interface User {
  avatarUrl: string | null;
  createdAt: Generated<Date>;
  id: string;
  name: string;
}

export interface DB {
  Oauth: Oauth;
  Session: Session;
  User: User;
}
