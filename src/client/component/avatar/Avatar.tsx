import cn from 'classnames';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

const diameter = 36;
const defaultAvatarUrl = '/public/default-avatar.png';

type AvatarProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  title?: string;
  url: string | null;
};

function Avatar({ className, title, url, ...props }: AvatarProps) {
  return (
    <div
      {...props}
      className={cn('inline-block overflow-hidden rounded-full', className)}
    >
      <img
        title={title}
        src={url || defaultAvatarUrl}
        width={diameter}
        height={diameter}
      />
    </div>
  );
}

export { Avatar };
