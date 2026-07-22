# Architecture

The project is a TypeScript monorepo with separate application and package boundaries.

## Applications

- `apps/api`: NestJS HTTP API. It owns API middleware, validation, Swagger/OpenAPI, filters, and future HTTP modules.
- `apps/worker`: NestJS application-context worker. It owns BullMQ processors and Redis-backed background execution.
- `apps/web`: React + Vite browser application. It owns routing, UI composition, browser tests, and static assets.

## Shared package

`packages/shared` contains framework-neutral constants and contracts that can be consumed by both CommonJS NestJS apps and the ESM web app after building to `dist`.

## Runtime dependencies

PostgreSQL is accessed through Prisma. Redis supports BullMQ and worker coordination. Docker Compose provides local infrastructure and service startup smoke coverage.
