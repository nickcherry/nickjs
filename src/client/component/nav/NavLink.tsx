import cn from 'classnames';
import { AnchorHTMLAttributes } from 'react';

type NavLinkProps = AnchorHTMLAttributes<HTMLAnchorElement>;

function NavLink({ className, ...props }: NavLinkProps) {
  return (
    <a
      className={cn('text-gray-500 text-sm font-medium', className)}
      {...props}
    />
  );
}

export { NavLink };
