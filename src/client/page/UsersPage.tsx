import { Page } from '@client/component/page/Page';
import { User } from '@shared/type';
import { PageProps } from '@shared/type/page';

function UsersPage({
  totalUserCount,
  users,
}: PageProps<{ totalUserCount: number; users: User[] }>) {
  return (
    <Page title="Users">
      <div className="font-medium">Total Users: {totalUserCount}</div>
      <hr className="my-2" />
      <div>
        {users.map((user) => (
          <div key={user.id}>
            <a href={`/users/${user.id}`}>{user.name}</a>
          </div>
        ))}
      </div>
    </Page>
  );
}

export { UsersPage };
