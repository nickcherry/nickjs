import { join, parse } from 'node:path';

import {
  bootstrapCacheDurationInSeconds,
  bootstrapFilenamePrefix,
  bootstrapFunctionName,
  bootstrapScriptClassName,
  srcDir,
} from '@ssr/config';
import { format } from '@tusbar/cache-control';

import { buildBundle } from './buildBundle';
import { skipReactPlugin } from './skipReactPlugin';

async function renderBootstrapBundle({
  query: { relativeSrcPath, srcImportName },
}: {
  query: { relativeSrcPath: string; srcImportName: string };
}) {
  const srcPath = join(srcDir, relativeSrcPath);
  const { dir, base, ext } = parse(srcPath);
  const bootstrapSrcPath = join(
    dir,
    `${bootstrapFilenamePrefix}_${Date.now()}_${Math.round(
      Math.random() * 10000000,
    )}_${base}${ext ? '' : '.tsx'}`,
  );

  const bootstrapSrcContent = `
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

import { createElement } from 'react';
import * as pageImport from '${srcPath}';
import { PageProvider } from '@client/context/PageProvider';
import { hydrateRoot } from 'react-dom/client';

window.${bootstrapFunctionName} = (props) => {
  document.querySelectorAll('script.${bootstrapScriptClassName}').forEach((node) => node.remove());
  const Page = pageImport['${srcImportName}'];
  const page = (
    <PageProvider {...props}>
      <Page {...props} />
    </PageProvider>
  );
  hydrateRoot(document, page);
}    
`;

  const { bundleContent } = await buildBundle({
    srcPath: bootstrapSrcPath,
    srcContent: bootstrapSrcContent,
    plugins: [skipReactPlugin],
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

export { renderBootstrapBundle };
