import { Page } from '@client/component/page/Page';
import { ReactNode } from 'react';

function Section({ children }: { children: ReactNode }) {
  return <section className="mb-8">{children}</section>;
}

function Heading({ children }: { children: ReactNode }) {
  return <h2 className="mb-2 text-xl font-medium">{children}</h2>;
}

function Paragraph({ children }: { children: ReactNode }) {
  return <p className="mb-4">{children}</p>;
}

function HomePage() {
  return (
    <Page title="Home" className="min-h-[1500px]">
      <Section>
        <Heading>Overview</Heading>
        <Paragraph>
          Nick.js is a lightweight web framework (glorified starter project,
          really) built with{' '}
          <a
            title="Bun"
            href="https://bun.sh/"
            target="_blank"
            rel="noreferrer"
          >
            Bun
          </a>
          ,{' '}
          <a
            title="ElysiaJS"
            href="https://elysiajs.com/"
            target="_blank"
            rel="noreferrer"
          >
            ElysiaJS
          </a>
          ,{' '}
          <a
            title="Kysely"
            href="https://github.com/kysely-org/kysely"
            target="_blank"
            rel="noreferrer"
          >
            Kysely
          </a>
          ,{' '}
          <a
            title="React"
            href="https://react.dev/"
            target="_blank"
            rel="noreferrer"
          >
            React
          </a>
          , and{' '}
          <a
            title="Tailwind"
            href="https://tailwindcss.com/"
            target="_blank"
            rel="noreferrer"
          >
            Tailwind
          </a>
          . It is designed to be type-safe, performant, easy to use, and
          flexible.
        </Paragraph>
      </Section>
      <Section>
        <Heading>SSR</Heading>
        <Paragraph>
          Nick.js supports basic server-side rendering + hydration. Each
          incoming page request is routed to a controller (i.e. an async
          function), which is responsible for retrieving any data the page
          needs, then returning a React element. The server&apos;s initial
          response will include only the rendered HTML plus two{' '}
          <code>script</code> tags - one to load React (typically already in the
          browser cache) and one to load javascript that responsible for
          hydrating the current page.
        </Paragraph>
        <Paragraph>
          There is one piece of magic required to make SSR and hydration work:
          Each React element returned by a controller must passed through{' '}
          <code>@ssr/app/clientRoot</code>. At build time, a custom{' '}
          <a
            title="Bun plugin"
            href="https://bun.sh/docs/bundler/plugins"
            target="_blank"
            rel="noreferrer"
          >
            Bun plugin
          </a>{' '}
          will replace this function call with code that renders the given
          component to an html string and appends scripts to hydrate the page.
        </Paragraph>
        <Paragraph>
          While not necessary, it&apos;s often convenient for controllers to use
          the
          <code>@server/util/pageController</code> and{' '}
          <code>@server/util/controller/decoratePageProps</code> helpers to add
          type information and pass common props (e.g. <code>currentUser</code>)
          to the page component.
        </Paragraph>
        <div
          className="pt-4"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `<script src="https://gist.github.com/nickcherry/93ebe3cd64bc8497603457b5930302cc.js"></script>`,
          }}
        ></div>
      </Section>
      <Section>
        <Heading>Code Organization</Heading>
        <Paragraph>
          Server code lives in <code>src/server</code>, aliased as{' '}
          <code>@server</code>.<br />
          Client code lives in <code>src/client</code>, aliased as{' '}
          <code>@client</code>.<br />
          Shared code (e.g. types, runtime-agnostic utility functions) lives in{' '}
          <code>src/shared</code>, aliased as <code>@shared</code>.
        </Paragraph>
        <Paragraph>
          ESlint rules are configured to prevent client code from importing any
          Bun/Node packages or code outside of the <code>@client</code> and{' '}
          <code>@shared</code> directories. This helps to ensure that
          server-side code is never referenced in a client bundle.
        </Paragraph>
      </Section>
      <Section>
        <Heading>Server</Heading>
        <Paragraph>
          The server is configured in <code>@server/server.tsx</code>. By
          default, Nick.js enables{' '}
          <a
            title="ElysiaJS plugins"
            href="https://elysiajs.com/plugins/overview.html"
            target="_blank"
            rel="noreferrer"
          >
            ElysiaJS plugins
          </a>{' '}
          for authentication, Tailwind styles, error handling, compression,{' '}
          <a href="https://github.com/rayriffy/elysia-rate-limit">
            rate limiting
          </a>
          ,{' '}
          <a href="https://github.com/DevTobias/elysia-helmet">
            securing http response headers
          </a>
          ,{' '}
          <a href="https://elysiajs.com/plugins/static.html">
            serving static files/folders
          </a>
          , and{' '}
          <a href="https://github.com/gtramontina/elysia-requestid">
            adding request ids
          </a>
          . It&apos;s recommended to use ElysiaJS{' '}
          <a
            title="schemas"
            href="https://elysiajs.com/concept/schema.html"
            target="_blank"
            rel="noreferrer"
          >
            schemas
          </a>{' '}
          to type and validate request inputs (e.g. path params, search params,
          body). Follow the patterns in <code>@shared/type/controller</code> to
          define schema validations for ElysiaJS and derive types that can be
          passed into <code>ControllerProps</code>.
        </Paragraph>
      </Section>
      <Section>
        <Heading>Database</Heading>
        <Paragraph>
          Nick.js uses{' '}
          <a
            href="https://github.com/kysely-org/kysely"
            target="_blank"
            rel="noreferrer"
          >
            Kysely
          </a>{' '}
          to interact with a{' '}
          <a href="https://planetscale.com/" target="_blank" rel="noreferrer">
            PlanetScale
          </a>
          -hosted MySQL database. Migrations can be found in{' '}
          <code>@server/database/migration</code>. By default, projects come
          with <code>User</code>, <code>Oauth</code>, and <code>Session</code>{' '}
          tables for basic authentication. New migrations can be run with{' '}
          <code>bun run migrate:to-latest</code>, which will have the effect of
          auto-generating + saving database types to{' '}
          <code>@shared/type/db/generated.ts</code>. When executing queries, use
          the <code>client</code> instance from{' '}
          <code>@server/database/client</code>.
        </Paragraph>
      </Section>
    </Page>
  );
}

export { HomePage };
