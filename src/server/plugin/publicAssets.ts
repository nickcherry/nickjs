import staticPlugin from '@elysiajs/static';
import { publicCacheDurationInSeconds } from '@server/constant/cache';
import { publicPath, publicSrcDir } from '@server/constant/path';
import { format } from '@tusbar/cache-control';

const publicAssets = staticPlugin({
  assets: publicSrcDir,
  prefix: publicPath,
  headers: {
    'Cache-Control': format({
      immutable: true,
      public: true,
      maxAge: publicCacheDurationInSeconds,
    }),
  },
});

export { publicAssets };
