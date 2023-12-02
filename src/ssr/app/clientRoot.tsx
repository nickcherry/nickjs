import { FC, ReactNode } from 'react';

import { clientRootWithSrcPath } from './clientRootWithSrcPath';

// At build time, `hydratePagePlugin` will replace imports referencing this file
// and import `clientRootWithSrcPath` instead.
function clientRoot<Props extends object>(
  Page: FC<Props>,
  props: Props,
): ReactNode | ReturnType<typeof clientRootWithSrcPath> {
  return <Page {...props} />;
}

export { clientRoot };
