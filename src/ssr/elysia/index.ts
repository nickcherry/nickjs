import {
  bootstrapFingerprintParam,
  bootstrapRelativeSrcPathParam,
  bootstrapRoutePath,
  bootstrapSrcImportNameParam,
  reactRoutePath,
} from '@ssr/config';
import Elysia, { t } from 'elysia';

import { renderBootstrapBundle } from './renderBootstrapBundle';
import { renderReactBundle } from './renderReactBundle';

const ssr = new Elysia({ name: 'hydratePage' })
  .get(reactRoutePath, renderReactBundle)
  .get(bootstrapRoutePath, renderBootstrapBundle, {
    query: t.Object({
      [bootstrapRelativeSrcPathParam]: t.String(),
      [bootstrapFingerprintParam]: t.String(),
      [bootstrapSrcImportNameParam]: t.String(),
    }),
  });

export { ssr };
