import { Avatar } from '@client/component/avatar/Avatar';
import { Page } from '@client/component/page/Page';
import { User } from '@shared/type';
import { PageProps } from '@shared/type/page';

function UserPage({ user }: PageProps<{ user: User }>) {
  return (
    <Page title={user.name}>
      <div className="flex flex-row items-center gap-2">
        <Avatar url={user.avatarUrl} />
        <span className="font-medium">{user.name}</span>
      </div>
    </Page>
  );
}

export { UserPage };
