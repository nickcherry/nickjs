import { client } from '@server/database';

async function findSessionUser({ token }: { token: string }) {
  return await client
    .selectFrom('User')
    .leftJoin('Session', 'Session.userId', 'User.id')
    .where('token', '=', token)
    .select(['User.id', 'User.name', 'User.avatarUrl', 'User.createdAt'])
    .executeTakeFirst();
}

export { findSessionUser };
