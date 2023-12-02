/* eslint-disable no-undef */
module.exports = {
  extends: ['../../.eslintrc.cjs'],

  rules: {
    'no-restricted-imports': [
      'error',
      {
        paths: [],
        patterns: [
          {
            group: ['../*'],
            message: 'Prefer absolute imports using an alias like @ssr/elysia.',
          },
          {
            group: ['src', '@src', '@client', '@server/*'],
            message: 'SSR code may only import from @ssr.',
          },
        ],
      },
    ],
  },
};
