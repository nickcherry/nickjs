import { Page } from '@client/component/page/Page';
import { RequestErrorCode } from '@shared/type';
import { PageProps } from '@shared/type/page';
import { useMemo } from 'react';

function ErrorPage({
  code,
  error,
  isDev,
}: PageProps<{
  code: RequestErrorCode;
  error:
    | { name: string; message: string; stack: string | undefined }
    | undefined;
  isDev: boolean;
}>) {
  const message = useMemo(() => {
    switch (code) {
      case 'NOT_FOUND':
        return "We couldn't find that page.";
      default:
        return 'Something went wrong.';
    }
  }, []);

  const details = useMemo(() => {
    if (!isDev || !error) {
      return null;
    }

    return `Name
${error.name}

Message
${error.message}

Stack
${error.stack}`;
  }, [error, isDev]);

  return (
    <Page title="Error">
      {message}
      {details && (
        <code className="mt-4 block border border-solid border-black p-4 text-left text-xs">
          {details}
        </code>
      )}
    </Page>
  );
}

export { ErrorPage };
