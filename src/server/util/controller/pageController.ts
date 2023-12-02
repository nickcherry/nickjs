import { isDev, isProd } from '@server/constant/env';
import {
  ControllerProps,
  ControllerSchemaProps,
  DefaultDecorators,
} from '@shared/type/controller/common';
import { DecoratorBase } from 'elysia';
import { ReactNode } from 'react';

type PageReturnValue = ReactNode | Response | void;

function pageController<
  Schema extends ControllerSchemaProps = NonNullable<unknown>,
  Decorators extends DecoratorBase = DefaultDecorators,
>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  controller: (
    props: ControllerProps<Schema, Decorators>,
  ) => PageReturnValue | Promise<PageReturnValue>,
) {
  return (props: ControllerProps<Schema, Decorators>) =>
    controller({ isDev, isProd, ...props });
}

export { pageController };
