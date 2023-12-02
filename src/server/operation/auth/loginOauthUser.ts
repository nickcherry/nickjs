import { client } from '@server/database';
import { generateSessionToken } from '@server/util/random/generateSessionToken';
import { generateUuid } from '@server/util/random/generateUuid';
import { NewUser } from '@shared/type';

type LoginOauthUserParams = {
  provider: { name: 'github'; userId: string };
  user: Omit<NewUser, 'id'>;
};

async function loginOauthUser(
  params: LoginOauthUserParams,
): Promise<{ token: string; userId: string }> {
  const { userId } = await ensureUserAndOauth(params);

  const existingSession = await client
    .selectFrom('Session')
    .select('token')
    .where('userId', '=', userId)
    .executeTakeFirst();

  if (existingSession) {
    return { token: existingSession.token, userId };
  }

  const sessionId = generateUuid();
  const token = generateSessionToken();

  await client
    .insertInto('Session')
    .values({ id: sessionId, userId, token })
    .execute();

  return { token, userId };
}

async function ensureUserAndOauth(params: LoginOauthUserParams) {
  const existingOauth = await client
    .selectFrom('Oauth')
    .select('userId')
    .where('providerName', '=', params.provider.name)
    .where('providerUserId', '=', params.provider.userId)
    .executeTakeFirst();

  if (existingOauth) {
    await client
      .updateTable('User')
      .set(params.user)
      .where('id', '=', existingOauth.userId)
      .execute();

    return { userId: existingOauth.userId };
  }

  const userId = generateUuid();

  await client
    .insertInto('User')
    .values({ ...params.user, id: userId })
    .execute();

  await client
    .insertInto('Oauth')
    .values({
      id: generateUuid(),
      userId,
      providerName: params.provider.name,
      providerUserId: params.provider.userId,
    })
    .execute();

  return { userId };
}

export { loginOauthUser };
