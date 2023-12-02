import { BunPlugin } from 'bun';

function replaceImport({
  contents,
  importName,
  windowProp,
}: {
  contents: string;
  importName: string;
  windowProp: string;
}) {
  return contents.replace(
    new RegExp(`import(\\s+[^;]*)\\s*from\\s+[?:'|"]${importName}[?:'|"]`, 's'),
    `const$1= window.${windowProp}`,
  );
}

const skipReactPlugin: BunPlugin = {
  name: 'skipReact',
  async setup(build) {
    const { readFileSync } = await import('fs');

    build.onLoad({ filter: /\.tsx?$/ }, async ({ path }) => {
      let contents = readFileSync(path, 'utf-8');

      contents = replaceImport({
        contents,
        importName: 'react',
        windowProp: 'React',
      });

      contents = replaceImport({
        contents,
        importName: 'react-dom',
        windowProp: 'ReactDOM',
      });

      contents = replaceImport({
        contents,
        importName: 'react-dom/client',
        windowProp: 'ReactDOM',
      });

      contents = replaceImport({
        contents,
        importName: 'react/jsx-runtime',
        windowProp: 'ReactJSXRuntime',
      });

      contents = replaceImport({
        contents,
        importName: 'react/jsx-dev-runtime',
        windowProp: 'ReactJSXRuntime',
      });

      return { contents, loader: 'tsx' };
    });
  },
};

export { skipReactPlugin };
