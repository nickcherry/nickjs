import { LoginPage } from '@client/page/LoginPage';
import { githubClientId } from '@server/constant/env';
import { decoratePageProps } from '@server/util/controller/decoratePageProps';
import { pageController } from '@server/util/controller/pageController';
import { clientRoot } from '@ssr/app/clientRoot';

const loginController = pageController((props) => {
  if (props.currentUser) {
    props.set.redirect = '/';
    return;
  }

  return clientRoot(LoginPage, decoratePageProps(props, { githubClientId }));
});

export { loginController };
