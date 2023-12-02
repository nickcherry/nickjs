import { UserPage } from '@client/page/UserPage';
import { client } from '@server/database';
import { decoratePageProps } from '@server/util/controller/decoratePageProps';
import { pageController } from '@server/util/controller/pageController';
import { UserSchema } from '@shared/type/controller/user';
import { clientRoot } from '@ssr/app/clientRoot';

const userController = pageController<UserSchema>(async (props) => {
  const user = await client
    .selectFrom('User')
    .selectAll()
    .where('id', '=', props.params.id)
    .executeTakeFirstOrThrow();

  return clientRoot(UserPage, decoratePageProps(props, { user }));
});

export { userController };
