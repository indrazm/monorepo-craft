# pnpm workspace

TypeScript monorepo with:

- `apps/api`: Hono on Node.js, Zod, and `@hono/zod-validator`.
- `apps/platform`: React, Vite, and TanStack Router with file-based routing.
- `packages/logger`: shared console logger (`@repo/logger`).

See [project documentation](docs/README.md) for technical decisions, product
decisions, and notes.

## Getting started

Use Node.js 22.12+ and pnpm 12.4.2.

```sh
pnpm install
pnpm dev
```

- Platform: http://localhost:5173
- API: http://localhost:3000/api/health

Vite forwards `/api` requests to the API during development. Set `PORT` to change
the API port, and update the Vite proxy target to match. For production, configure
your web server to serve the platform and forward `/api` to the API, with an SPA
fallback to `index.html` for frontend routes.

## Commands

```sh
pnpm dev                        # Build logger, then watch all packages
pnpm build                      # Build all packages in dependency order
pnpm typecheck                  # Check all TypeScript packages
pnpm --filter @repo/api start    # Run the built API after pnpm build
pnpm --filter @repo/platform preview # Preview the frontend build only
```

## API example

```sh
curl http://localhost:3000/api/health
curl http://localhost:3000/api/hello \
  -H 'Content-Type: application/json' \
  -d '{"name":"World"}'
```

`POST /api/hello` requires a nonempty `name` (up to 100 characters). Invalid input
returns HTTP 400.

## File-based routes

Add routes in `apps/platform/src/routes`. `__root.tsx` is the shared layout,
`index.tsx` maps to `/`, and `about.tsx` maps to `/about`. The Vite plugin generates
`src/routeTree.gen.ts` on dev/build; keep that generated file in version control
and do not edit it manually. Run dev or build after adding routes before running
a standalone typecheck.

## Shared logger

```ts
import { createLogger } from '@repo/logger'

const log = createLogger('my-feature')
log.info('Ready')
log.error('Something failed', { reason: 'example' })
```

The logger supports `debug`, `info`, `warn`, and `error` in Node.js and the browser.
