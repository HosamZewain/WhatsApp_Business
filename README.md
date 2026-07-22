# WhatsApp Business

Full-stack foundation for the WhatsApp Business platform. This repository intentionally contains only Issue #3 foundation work and no Issue #1 business functionality.

## Stack

- NestJS API with Swagger/OpenAPI, validation, correlation IDs, consistent errors, Prisma, Redis, and BullMQ wiring
- Independent NestJS worker with Redis and BullMQ bootstrap
- React + Vite web app
- Shared contracts in `packages/shared`
- Jest, Vitest, Playwright, ESLint, Prettier, and strict TypeScript tooling
- Docker Compose for Postgres, Redis, API, Worker, and Web services

## Requirements

Use Node.js `24.18.0` from `.nvmrc` / `.node-version` and npm 10 or newer.

## Local setup

```bash
cp .env.example .env
npm install
npm run prisma:generate --workspace @whatsapp-business/api
npx playwright install --with-deps chromium
npm run verify
npm run test:e2e
```

## Development

```bash
npm run dev
```

Smoke scripts are available with `npm run smoke:api`, `npm run smoke:worker`, `npm run smoke:web`, and `npm run smoke:compose`.

## Docker Compose

Docker Compose includes PostgreSQL, Redis, API, Worker, and Web services.

```bash
docker compose config
docker compose up
```

## Documentation

- Product scope: `docs/product-scope.md`
- Architecture: `docs/architecture.md`
- Coding standards: `docs/coding-standards.md`
- Database rules: `docs/database-rules.md`
- Security rules: `docs/security-rules.md`
- Testing strategy: `docs/testing-strategy.md`
- API conventions: `docs/api-conventions.md`
