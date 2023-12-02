import {
  bootstrapFingerprintParam,
  bootstrapRelativeSrcPathParam,
  bootstrapRoutePath,
  bootstrapSrcImportNameParam,
  reactRoutePath,
} from '@ssr/config';
import Elysia, { t } from 'elysia';

import { renderBootstrapBundle } from './elysia/renderBootstrapBundle';
import { renderReactBundle } from './elysia/renderReactBundle';

const hydratePage = new Elysia({ name: 'hydratePage' })
  .get(reactRoutePath, renderReactBundle)
  .get(bootstrapRoutePath, renderBootstrapBundle, {
    query: t.Object({
      [bootstrapRelativeSrcPathParam]: t.String(),
      [bootstrapFingerprintParam]: t.String(),
      [bootstrapSrcImportNameParam]: t.String(),
    }),
  });

export { hydratePage };
