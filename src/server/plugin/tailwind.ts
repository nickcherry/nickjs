import { cssCacheDurationInSeconds } from '@server/constant/cache';
import {
  compiledCssPath,
  tailwindConfigPath,
  tailwindSourcePath,
} from '@server/constant/path';
import { format } from '@tusbar/cache-control';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import Elysia from 'elysia';
import postcss from 'postcss';
import tw from 'tailwindcss';

const tailwind = new Elysia({ name: 'tailwind' }).use(() => {
  const cssPromise = (async () => {
    const source = tailwindSourcePath;
    const sourceText = await Bun.file(source).text();

    const { css } = await postcss(
      tw(tailwindConfigPath),
      autoprefixer(),
      cssnano(),
    ).process(sourceText, { from: source });

    return css;
  })();

  return new Elysia({ name: 'tailwind' }).get(
    compiledCssPath,
    async () =>
      new Response(await cssPromise, {
        headers: {
          'Content-Type': 'text/css',
          'Cache-Control': format({
            maxAge: cssCacheDurationInSeconds,
            public: true,
          }),
        },
      }),
  );
});

export { tailwind };
