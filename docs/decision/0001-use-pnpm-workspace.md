# 0001: Use a pnpm workspace

- Date: 2026-10-08
- Status: accepted

## Context

The project needs an API, a web platform, and a shared logger in one repository.
The requested stack is Hono with Zod validation for the API, and React with Vite
and TanStack Router file-based routing for the platform.

## Decision

Use a TypeScript pnpm workspace with these packages:

- `apps/api`: Hono, Zod, and `@hono/zod-validator` running on Node.js.
- `apps/platform`: React, Vite, and TanStack Router with file-based routes.
- `packages/logger`: a basic console logger shared through `@repo/logger`.

Use `workspace:*` for local package dependencies and root scripts for development,
builds, and typechecking.

## Consequences

- Both apps can reuse the logger without publishing it to a registry.
- The logger must be built before its consumers; the root scripts handle this.
- Dependencies share one pnpm lockfile.
- Vite proxies `/api` requests during development. Production hosting needs its
  own API forwarding and frontend route fallback configuration.
