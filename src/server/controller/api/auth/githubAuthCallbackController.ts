import { githubClientId, githubSecret } from '@server/constant/env';
import { loginOauthUser } from '@server/operation/auth/loginOauthUser';
import { getSessionCookie } from '@server/util/controller/getSessionCookie';
import { GithubAuthCallbackSchema } from '@shared/type/controller/auth';
import { ControllerProps } from '@shared/type/controller/common';

function buildGithubUsername({ githubId }: { githubId: number }) {
  return `github:${githubId}`;
}

export { buildGithubUsername };

const githubAuthCallbackController = async ({
  cookie,
  query: { code },
  set,
}: ControllerProps<GithubAuthCallbackSchema>) => {
  const {
    access_token: accessToken,
  }: {
    access_token: string;
  } = await fetch(
    `https://github.com/login/oauth/access_token?${new URLSearchParams({
      client_id: githubClientId,
      client_secret: githubSecret,
      code: code,
    })}`,
    { method: 'POST', headers: { accept: 'application/json' } },
  ).then((res) => res.json());

  const githubUser: {
    id: number;
    login: string;
    name: string;
    avatar_url: string;
  } = await fetch(`https://api.github.com/user`, {
    headers: { Authorization: `token ${accessToken}` },
  }).then((res) => res.json());

  const { token } = await loginOauthUser({
    provider: { name: 'github', userId: String(githubUser.id) },
    user: { avatarUrl: githubUser.avatar_url, name: githubUser.name },
  });

  const sessionCookie = getSessionCookie({ cookie });
  sessionCookie.httpOnly = true;
  sessionCookie.path = '/';
  sessionCookie.value = { token };

  set.redirect = '/';
};

export { githubAuthCallbackController };
