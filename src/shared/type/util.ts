export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

export type NoUndefinedField<T> = {
  [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>>;
};
