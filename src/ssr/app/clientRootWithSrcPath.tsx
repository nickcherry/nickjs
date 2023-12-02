import { relative } from 'node:path';

// eslint-disable-next-line no-restricted-imports
import { PageProvider } from '@client/context/PageProvider';
import { PageProps } from '@shared/type/page';
import {
  bootstrapFingerprintParam,
  bootstrapFunctionName,
  bootstrapRelativeSrcPathParam,
  bootstrapRoutePath,
  bootstrapScriptClassName,
  bootstrapSrcImportNameParam,
  fingerprint,
  reactRoutePath,
  srcDir,
} from '@ssr/config';
import { FC } from 'react';
import { renderToString } from 'react-dom/server';

async function clientRootWithSrcPath<Props extends PageProps>(
  srcPath: string,
  importName: 'default' | string,
  Page: FC<Props>,
  props: Props,
) {
  const relativeSrcPath = relative(srcDir, srcPath);

  const bootstrapScriptSrc = `${bootstrapRoutePath}?${new URLSearchParams({
    [bootstrapRelativeSrcPathParam]: relativeSrcPath,
    [bootstrapSrcImportNameParam]: importName,
    [bootstrapFingerprintParam]: fingerprint,
  })}`;

  return new Response(
    renderToString(
      <>
        <PageProvider {...props}>
          <Page {...props} />
        </PageProvider>
        <script
          className={bootstrapScriptClassName}
          dangerouslySetInnerHTML={{
            __html: `

function injectBootstrapScript() {
  const bootstrapScript = document.createElement( 'script' );
  bootstrapScript.className = '${bootstrapScriptClassName}';
  bootstrapScript.src = '${bootstrapScriptSrc}';
  bootstrapScript.onload = () => {
    window.${bootstrapFunctionName}(${JSON.stringify(props)});
  };
  document.body.appendChild(bootstrapScript);
}

function injectReactScript() {
  const reactScript = document.createElement( 'script' );
  reactScript.className = '${bootstrapScriptClassName}';
  reactScript.src = '${reactRoutePath}';
  reactScript.onload = injectBootstrapScript;
  document.body.appendChild(reactScript);
}

injectReactScript();
              `,
          }}
        ></script>
      </>,
    ),
    {
      headers: { 'Content-Type': 'text/html' },
    },
  );
}

export { clientRootWithSrcPath };
