import { client } from '@server/database';

type LogoutOauthUserParams = {
  token: string;
};

function logoutOauthUser({ token }: LogoutOauthUserParams) {
  return client.deleteFrom('Session').where('token', '=', token).execute();
}

export { logoutOauthUser };
