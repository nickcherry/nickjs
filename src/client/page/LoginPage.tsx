import { LoginWithGithub } from '@client/component/auth/LoginWithGithub';
import { Page } from '@client/component/page/Page';
import { PageProps } from '@shared/type/page';

function LoginPage({ githubClientId }: PageProps<{ githubClientId: string }>) {
  return (
    <Page title="Login" className="text-center">
      <LoginWithGithub githubClientId={githubClientId} />
    </Page>
  );
}

export { LoginPage };
