# Agent Instructions

## Project commands

- Install dependencies with `npm ci` on CI and clean checkouts; use `npm install` only when intentionally updating `package-lock.json`.
- Run `npm run format:check`, `npm run lint`, `npm run typecheck`, `npm run test`, `npm run build`, `npm run verify`, and `npm run test:e2e` before completing foundation changes when the environment supports them.
- Use `npm run dev` for concurrent local API, Worker, and Web development.
- Use `npm run smoke:api`, `npm run smoke:worker`, `npm run smoke:web`, and `npm run smoke:compose` for startup checks.

## Architecture boundaries

- Keep the monorepo split into `apps/api`, `apps/worker`, `apps/web`, and `packages/shared`.
- Put shared constants, DTO-neutral contracts, and cross-app types in `packages/shared`.
- Do not implement Issue #1 or business-specific messaging, contacts, campaign, template, billing, or analytics features while working on foundation issues.
- The API may expose framework infrastructure such as Swagger, filters, pipes, and middleware, but no business endpoints until their issue is approved.

## Testing requirements

- API and Worker tests use Jest; Web unit tests use Vitest; browser E2E tests use Playwright.
- Add or update tests for changed behavior, and keep tests deterministic without relying on external SaaS services.
- E2E tests must exercise only foundation routes or explicitly scoped feature routes.

## Database and migration rules

- Prisma is the database access layer; do not replace it with hand-rolled database scripts.
- Keep schema changes minimal and tied to approved issues.
- Do not add business models without an issue that explicitly requests them.
- Generate Prisma clients with the checked-in `prisma:generate` script; do not commit generated client output unless the project policy changes.

## Security rules

- Never commit real secrets, access tokens, private keys, customer data, or production credentials.
- Document required configuration in `.env.example` with safe local defaults only.
- Validate environment variables at application startup.
- Preserve request correlation IDs and consistent error envelopes for operational traceability.

## Git and PR rules

- Keep changes focused on the requested issue and branch.
- Commit the final patch before handing off.
- Update the existing pull request metadata instead of creating a new PR when asked to fix an existing PR.
- PR descriptions must accurately list commands that actually run in CI and locally.

## Definition of Done

- Required dependencies are real packages with explicit semver ranges.
- Shared packages build before applications that consume them.
- Lint, format check, typecheck, unit tests, build, verification, E2E, and startup smoke checks either pass or have a clearly documented external blocker.
- Docker Compose configuration avoids unsafe shared dependency writes and has a smoke test that always tears services down.

## Stop and request clarification when

- A requested change would implement unapproved business functionality.
- Required package installation or verification is blocked by registry, engine, or environment failures that cannot be fixed without changing scope.
- Acceptance criteria conflict with direct user/developer instructions.
- Secrets or production credentials appear necessary to proceed.
