export type NickJsErrorOptions<T extends object = object> = {
  error?: unknown;
} & T;

export class NickJsError extends Error {
  readonly error?: unknown;

  constructor(name: string, { error }: NickJsErrorOptions) {
    super(name);
    this.error = error;
  }
}

export type RequestErrorCode =
  | 'UNKNOWN'
  | 'VALIDATION'
  | 'NOT_FOUND'
  | 'PARSE'
  | 'INTERNAL_SERVER_ERROR'
  | 'INVALID_COOKIE_SIGNATURE';
