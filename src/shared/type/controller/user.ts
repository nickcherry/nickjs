import { StaticSchema } from '@shared/type/controller/common';
import { t } from 'elysia';

export const userSchema = {
  params: t.Object({ id: t.String() }),
};

export type UserSchema = StaticSchema<typeof userSchema>;
