import { plugin } from 'bun';

import { doesRenderClientRoot } from './doesRenderClientRoot';
import { updateReferencesAndPrependSrcPath } from './updateReferencesAndPrependSrcPath';

plugin({
  name: 'ssr',
  async setup(build) {
    const { readFileSync } = await import('fs');

    build.onLoad({ filter: /\.tsx?$/ }, async ({ path }) => {
      let contents = readFileSync(path, 'utf-8');

      if (doesRenderClientRoot({ contents })) {
        contents = updateReferencesAndPrependSrcPath({ contents, path });
      }

      return { contents, loader: 'jsx' };
    });
  },
});
