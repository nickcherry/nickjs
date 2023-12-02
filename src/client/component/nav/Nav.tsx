import { usePage } from '@client/context/PageProvider';

import { AuthedNav } from './AuthedNav';
import { UnauthedNav } from './UnauthedNav';

function Nav() {
  const { currentUser } = usePage();

  return (
    <nav className="container relative mx-auto flex min-h-[64px] max-w-[960px] flex-row items-center justify-between  px-4 text-sm">
      {currentUser ? <AuthedNav /> : <UnauthedNav />}
    </nav>
  );
}

export { Nav };
