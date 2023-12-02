import { NickJsError, NickJsErrorOptions } from '@shared/type';

export class MissingEnvVarError extends NickJsError {
  readonly key: string;

  constructor(options: NickJsErrorOptions<{ key: string }>) {
    super(`Missing environment variable: ${options.key}`, options);
    this.key = options.key;
  }
}
