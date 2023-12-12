import { NavLink } from './NavLink';

function UnauthedNav() {
  return (
    <>
      <div className="flex flex-row gap-6">
        <NavLink title="Home" href="/">
          Home
        </NavLink>
      </div>
      <div>
        <NavLink href="/login">Login</NavLink>
      </div>
    </>
  );
}

export { UnauthedNav };
