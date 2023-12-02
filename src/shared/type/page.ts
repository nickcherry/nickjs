import { User } from './model/user';

export type PageProps<T = NonNullable<unknown>> = {
  currentUser: User | undefined;
  isDev: boolean;
  isProd: boolean;
  serverStartedAt: number;
} & T;
