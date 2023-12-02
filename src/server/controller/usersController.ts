import { UsersPage } from '@client/page/UsersPage';
import { client } from '@server/database';
import { decoratePageProps } from '@server/util/controller/decoratePageProps';
import { pageController } from '@server/util/controller/pageController';
import { UserSchema } from '@shared/type/controller/user';
import { clientRoot } from '@ssr/app/clientRoot';

const usersController = pageController<UserSchema>(async (props) => {
  const { totalUserCount } = await client
    .selectFrom('User')
    .select(({ fn }) => fn.countAll<number>().as('totalUserCount'))
    .executeTakeFirstOrThrow();

  const users = await client.selectFrom('User').selectAll().limit(50).execute();

  return clientRoot(
    UsersPage,
    decoratePageProps(props, { totalUserCount, users }),
  );
});

export { usersController };
