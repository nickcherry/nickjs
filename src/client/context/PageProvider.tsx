import { User } from '@shared/type';
import { PageProps } from '@shared/type/page';
import { createContext, ReactNode, useContext } from 'react';

type PageContextValue = PageProps;

const PageContext = createContext<PageContextValue>({
  currentUser: undefined,
  isDev: false,
  isProd: false,
  serverStartedAt: 0,
});

type PageProviderProps = PageProps & {
  children: ReactNode;
};

function PageProvider({
  children,
  currentUser,
  isDev,
  isProd,
  serverStartedAt,
}: PageProviderProps) {
  return (
    <PageContext.Provider
      value={{ currentUser, isDev, isProd, serverStartedAt }}
    >
      {children}
    </PageContext.Provider>
  );
}

function usePage() {
  return useContext(PageContext);
}

function useAuthedPage() {
  return usePage() as PageContextValue & { currentUser: User };
}

export { PageProvider, useAuthedPage, usePage };
