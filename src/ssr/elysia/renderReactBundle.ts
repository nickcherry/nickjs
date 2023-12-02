import { join } from 'node:path';

import {
  bootstrapCacheDurationInSeconds,
  reactBaseFilename,
  srcDir,
} from '@ssr/config';
import { format } from '@tusbar/cache-control';

import { buildBundle } from './buildBundle';

async function renderReactBundle() {
  const srcPath = join(srcDir, `${reactBaseFilename}.tsx`);
  const srcContent = `
import React from 'react';
import ReactDOM from 'react-dom/client';
import ReactJSXRuntime from 'react/jsx-runtime';

window.React = React;
window.ReactDOM = ReactDOM;
window.ReactJSXRuntime = ReactJSXRuntime;
`;

  const { bundleContent } = await buildBundle({
    srcContent,
    srcPath,
  });

  return new Response(bundleContent, {
    headers: {
      'Cache-Control': format({
        public: true,
        maxAge: bootstrapCacheDurationInSeconds,
      }),
      'Content-Type': 'text/javascript',
    },
  });
}

export { renderReactBundle };
