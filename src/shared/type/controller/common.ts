import { User } from '@shared/type';
import { TSchema } from '@sinclair/typebox';
import { Context, DecoratorBase, RouteSchema, Static } from 'elysia';

export type ControllerSchemaProps = { [Key in keyof RouteSchema]?: object };

export type DefaultDecorators = {
  currentUser: User | undefined;
  requestID: string | undefined;
  request: NonNullable<unknown>;
  store: NonNullable<unknown>;
};

export type ControllerProps<
  Schema extends ControllerSchemaProps = NonNullable<unknown>,
  Decorators extends DecoratorBase = DefaultDecorators,
> = Schema & Decorators & Context<Schema, Decorators>;

export type StaticSchema<Schema extends Record<string, TSchema>> = {
  [Key in keyof Schema]: Static<Schema[Key]>;
};
