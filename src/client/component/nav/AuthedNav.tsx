import { Avatar } from '@client/component/avatar/Avatar';
import { useAuthedPage } from '@client/context/PageProvider';
import cn from 'classnames';
import { useState } from 'react';

import { NavLink } from './NavLink';

function AuthedNav() {
  const { currentUser } = useAuthedPage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <div className="flex flex-row gap-6">
        <NavLink title="Home" href="/">
          Home
        </NavLink>
        <NavLink title="Users" href="/users">
          Users
        </NavLink>
      </div>
      <div className="flex flex-row items-center">
        <Avatar
          className={cn(
            'relative z-10 cursor-pointer',
            isMenuOpen && 'outline-[#fffcfa] outline',
          )}
          url={currentUser.avatarUrl}
          onClick={() => {
            setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen);
          }}
        />
        {isMenuOpen && (
          <div className="absolute right-0 top-0 z-0 bg-[#010000] pb-4 pl-4 pr-[68px] pt-5 text-sm text-[#fffcfa]">
            <a className="text-[#fffcfa]" href={`/users/${currentUser.id}`}>
              {currentUser.name}
            </a>
            <form action="/logout" method="POST" className="mt-1">
              <button type="submit" className="text-xs">
                Logout
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
}

export { AuthedNav };
