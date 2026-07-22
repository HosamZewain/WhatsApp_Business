# Testing Strategy

## Test layers

- Unit tests validate isolated NestJS and React behavior.
- Type checks validate workspace contracts and shared package consumption.
- Playwright E2E tests validate the browser foundation route.
- Smoke scripts prove built API, Worker, and Web processes can start.
- Docker Compose smoke checks validate local infrastructure and service build commands.

## Commands

Run `npm run verify` for format, lint, typecheck, unit test, Prisma generation, and build checks. Run `npm run test:e2e` for browser E2E coverage after Playwright Chromium is installed.
