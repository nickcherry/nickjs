/* eslint-disable no-undef */
module.exports = {
  root: true,
  env: {
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:tailwindcss/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'import',
    'no-restricted-imports',
    'react',
    'simple-import-sort',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    curly: 'error',
    eqeqeq: 'error',
    'no-console': 'off',
    'no-constant-condition': 'off',
    'no-duplicate-imports': 'error',
    'no-restricted-globals': ['error', 'reportError'],
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['src/*'],
            message: 'Prefer an alias defined in tsconfig.json.',
          },
          {
            group: ['../*'],
            message:
              'Prefer absolute imports using an alias like @server/controller or @server/constant.',
          },
        ],
        paths: [
          {
            name: '@shared/type/db/generated',
            message: 'Prefer wrapped type from @shared/type/model',
          },
        ],
      },
    ],
    'react/react-in-jsx-scope': 'off',
    'react/no-unescaped-entities': 'error',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
  },
};
