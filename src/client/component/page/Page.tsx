import { Nav } from '@client/component/nav/Nav';
import cn from 'classnames';
import { ReactNode } from 'react';

type PageProps = {
  children: ReactNode;
  className?: string;
  title: string;
};

function Page({ children, className, title }: PageProps) {
  return (
    <html>
      <head>
        <title>{title}</title>
        <link rel="stylesheet" href={'/style.css'} type="text/css" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <Nav />
        <main
          className={cn(
            'container m-auto max-w-[960px] p-4 text-left',
            className,
          )}
        >
          {children}
        </main>
      </body>
    </html>
  );
}

export { Page };
