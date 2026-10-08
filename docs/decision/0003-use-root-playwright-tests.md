# 0003: Use root Playwright tests

- Date: 2026-10-08
- Status: accepted

## Context

The workspace needs end-to-end tests that exercise the platform and API together.

## Decision

Configure Playwright at the repository root, with tests in `e2e/` and Chromium
as the initial browser. Cover platform routing and the real API through Vite's
proxy without mocking responses.

Let Playwright start and stop its own API and Vite servers on ports 3100 and 4173.
Do not reuse existing servers, so tests run against the current workspace.
Use `API_PROXY_TARGET` to connect the test platform to the test API.

Include test code and configuration in the root typecheck. Run E2E tests separately
with `pnpm test:e2e`; keep the pre-commit checks as lint, typecheck, and build.

## Consequences

- Tests can run alongside normal development on ports 3000 and 5173.
- Developers must install Playwright's Chromium browser before their first run.
- Failures produce screenshots, with traces collected on the first retry.
- CI enables two retries and one worker; local runs do not retry by default.
- The suite uses Vite's development server and does not verify production hosting
  or other browser engines.
