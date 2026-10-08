# 0002: Use Oxlint, Oxfmt, and Husky

- Date: 2026-10-08
- Status: accepted

## Context

The workspace needs shared linting and formatting tools, and commits must pass
lint, typecheck, and build checks.

## Decision

Use Oxlint for linting, Oxfmt for formatting, and Husky for Git hooks. Configure
the tools at the workspace root, with TypeScript and React lint rules enabled.
Preserve the existing single-quote, no-semicolon style in JavaScript and TypeScript.

The pre-commit hook runs these commands in order and stops on failure:

1. `pnpm lint`
2. `pnpm typecheck`
3. `pnpm build`

Run formatting separately through `pnpm format` or `pnpm format:check`. Exclude
generated route trees and build output from linting and formatting.

## Consequences

- Developers get consistent root commands for code quality checks.
- `pnpm install` installs the Git hooks through the `prepare` script.
- Each commit checks the entire workspace, so commit time grows with the project.
- The hook checks working-tree files and does not automatically stage changes.
- Local hooks are not a substitute for CI checks.
