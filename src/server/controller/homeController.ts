import { HomePage } from '@client/page/HomePage';
import { decoratePageProps } from '@server/util/controller/decoratePageProps';
import { pageController } from '@server/util/controller/pageController';
import { clientRoot } from '@ssr/app/clientRoot';

const homeController = pageController(async (props) => {
  return clientRoot(HomePage, decoratePageProps(props, {}));
});

export { homeController };
