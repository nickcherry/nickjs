import { gzipSync } from 'bun';
import compressible from 'compressible';
import Elysia, { mapResponse } from 'elysia';

function shouldCompress({
  contentType,
}: {
  contentType: string | null | undefined;
}) {
  if (!contentType) {
    return false;
  }

  return compressible(contentType);
}

function toBuffer(data: unknown, encoding: BufferEncoding) {
  return Buffer.from(
    typeof data === 'object'
      ? JSON.stringify(data)
      : data?.toString() ?? new String(data),
    encoding,
  );
}

const gzip = new Elysia({ name: 'gzip' }).onAfterHandle(async (ctx) => {
  const mappedResponse = mapResponse(ctx.response, {
    status: 200,
    headers: {},
  });

  if (mappedResponse.headers) {
    const contentType = mappedResponse.headers.get('Content-Type');

    if (shouldCompress({ contentType })) {
      const compressedBody = gzipSync(
        toBuffer(await mappedResponse.text(), 'utf-8'),
        {},
      );

      ctx.response = new Response(compressedBody, {
        headers: mappedResponse.headers,
      });
      ctx.set.headers['Content-Encoding'] = 'gzip';
    }
  }
});

export { gzip };
