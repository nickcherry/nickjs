/* eslint-disable no-undef */
module.exports = {
  extends: ['../../.eslintrc.cjs'],

  rules: {
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: 'bun',
            message: 'Bun cannot be used in client code.',
          },
          {
            name: 'assert',
            message: 'Node packages cannot be used in client code.',
          },
          {
            name: 'buffer',
            message: 'Node packages cannot be used in client code.',
          },
          {
            name: 'child_process',
            message: 'Node packages cannot be used in client code.',
          },
          {
            name: 'crypto',
            message: 'Node packages cannot be used in client code.',
          },
          {
            name: 'dgram',
            message: 'Node packages cannot be used in client code.',
          },
          {
            name: 'dns',
            message: 'Node packages cannot be used in client code.',
          },
          {
            name: 'domain',
            message: 'Node packages cannot be used in client code.',
          },
          {
            name: 'events',
            message: 'Node packages cannot be used in client code.',
          },
          {
            name: 'freelist',
            message: 'Node packages cannot be used in client code.',
          },
          {
            name: 'fs',
            message: 'Node packages cannot be used in client code.',
          },
          {
            name: 'http',
            message: 'Node packages cannot be used in client code.',
          },
          {
            name: 'https',
            message: 'Node packages cannot be used in client code.',
          },
          {
            name: 'module',
            message: 'Node packages cannot be used in client code.',
          },
          {
            name: 'net',
            message: 'Node packages cannot be used in client code.',
          },
          {
            name: 'os',
            message: 'Node packages cannot be used in client code.',
          },
          {
            name: 'path',
            message: 'Node packages cannot be used in client code.',
          },
          {
            name: 'punycode',
            message: 'Node packages cannot be used in client code.',
          },
          {
            name: 'querystring',
            message: 'Node packages cannot be used in client code.',
          },
          {
            name: 'readline',
            message: 'Node packages cannot be used in client code.',
          },
          {
            name: 'repl',
            message: 'Node packages cannot be used in client code.',
          },
          {
            name: 'smalloc',
            message: 'Node packages cannot be used in client code.',
          },
          {
            name: 'stream',
            message: 'Node packages cannot be used in client code.',
          },
          {
            name: 'string_decoder',
            message: 'Node packages cannot be used in client code.',
          },
          {
            name: 'sys',
            message: 'Node packages cannot be used in client code.',
          },
          {
            name: 'timers',
            message: 'Node packages cannot be used in client code.',
          },
          {
            name: 'tls',
            message: 'Node packages cannot be used in client code.',
          },
          {
            name: 'tracing',
            message: 'Node packages cannot be used in client code.',
          },
          {
            name: 'tty',
            message: 'Node packages cannot be used in client code.',
          },
          {
            name: 'url',
            message: 'Node packages cannot be used in client code.',
          },
          {
            name: 'util',
            message: 'Node packages cannot be used in client code.',
          },
          {
            name: 'vm',
            message: 'Node packages cannot be used in client code.',
          },
          {
            name: 'zlib',
            message: 'Node packages cannot be used in client code.',
          },
        ],
        patterns: [
          {
            group: ['../*'],
            message:
              'Prefer absolute imports using an alias like @client/component or @client/page.',
          },
          {
            group: ['src', '@src', '@server/*'],
            message: 'Client code may only import from @client.',
          },
          {
            group: ['bun:*'],
            message: 'Bun cannot be used in client code.',
          },
          {
            group: ['node:*'],
            message: 'Node packages cannot be used in client code.',
          },
        ],
      },
    ],
  },
};
