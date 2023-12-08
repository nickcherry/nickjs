# Nick.js

Nick.js is a lightweight web framework (glorified starter project, really) built with [Bun](https://bun.sh/), [ElysiaJS](https://elysiajs.com), [Kysely](https://github.com/kysely-org/kysely), [React](https://react.dev), and [Tailwind](https://tailwindcss.com/). It is designed to be type-safe, performant, easy to use, and flexible.

**It is is *very* beta software, mostly intended for personal use. Exercise caution if using for any serious project.**

## Installation

To create a new Nick.js project:

```shell
bun create nickjs
```

Be sure to verify that you get the latest version of Nick.js (i.e. the `version` in `package.json`). There is currently [a Bun bug](https://github.com/oven-sh/bun/issues/4989) that results in `bunx` using stale versions of packages.

## SSR

Nick.js supports basic server-side rendering + hydration. Each incoming page request is routed to a controller (i.e. an async function), which is responsible for retrieving any data the page needs, then returning a React element. The server's initial response will include only the rendered HTML plus two `script` tags - one to load React (typically already in the browser cache) and one to load javascript that responsible for hydrating the current page.

There is one piece of magic required to make SSR and hydration work: Each React element returned by a controller must passed through `@ssr/app/clientRoot`. At build time, a custom [Bun plugin](https://bun.sh/docs/bundler/plugins) will replace this function call with code that renders the given component to an html string and appends scripts to hydrate the page.

While not necessary, it's often convenient for controllers to use the `@server/util/pageController` and `@server/util/controller/decoratePageProps` helpers to add type information and pass common props (e.g. `currentUser`) to the page component.

```typescript
const userController = pageController<UserSchema>(async (props) => {
  const user = await client
    .selectFrom('User')
    .selectAll()
    .where('id', '=', props.params.id)
    .executeTakeFirstOrThrow();

  return clientRoot(UserPage, decoratePageProps(props, { user }));
});

export { userController };
```

```typescript
function UserPage({ currentUser, user }: PageProps<{ user: User }>) {
  return (
    <Page title={user.name}>
      <div className="flex flex-row items-center gap-2">
        <Avatar url={user.avatarUrl} />
        <span className="font-bold">{user.name}</span>
        {user.id === currentUser?.id && (
          <a href={`/users/${user.id}/edit`}>Edit</a>
        )}
      </div>
    </Page>
  );
}

export { UserPage };
```

## Code Organization

Server code lives in `src/server`, aliased as `@server`.<br />
Client code lives in `src/client`, aliased as `@client`.<br />
Shared code (e.g. types, runtime-agnostic utility functions) lives in `src/shared`, aliased as `@shared`.

ESlint rules are configured to prevent client code from importing any Bun/Node packages or code outside of the `@client` and `@shared` directories. This helps to ensure that server-side code is never referenced in a client bundle.

## Server

The server is configured in `@server/server.tsx`. By default, Nick.js enables [ElysiaJS plugins](https://elysiajs.com/plugins/overview.html) for authentication, Tailwind styles, error handling, compression, [rate limiting](https://github.com/rayriffy/elysia-rate-limit), [securing http response headers](https://github.com/DevTobias/elysia-helmet), [serving static files/folders](https://elysiajs.com/plugins/static.html), and [adding request ids](https://github.com/gtramontina/elysia-requestid). It's recommended to use ElysiaJS [schemas](https://elysiajs.com/concept/schema.html) to type and validate request inputs (e.g. path params, search params, body). Follow the patterns in `@shared/type/controller` to define schema validations for ElysiaJS and derive types that can be passed into `ControllerProps`.

## Database

Nick.js uses [Kysely](https://github.com/kysely-org/kysely) to interact with a [PlanetScale](https://planetscale.com)-hosted MySQL database. Migrations can be found in `@server/database/migration`. By default, projects come with `User`, `Oauth`, and `Session` tables for basic authentication. New migrations can be run with `bun run migrate:to-latest`, which will have the effect of auto-generating + saving database types to `@shared/type/db/generated.ts`. When executing queries, use the `client` instance from `@server/database/client`.

