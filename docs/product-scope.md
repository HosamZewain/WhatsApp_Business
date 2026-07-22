# Product Scope

This repository currently covers the Issue #3 foundation only. It establishes the runtime, tooling, quality gates, and documentation needed before product features are added.

## In scope

- Monorepo structure for API, Worker, Web, and Shared packages.
- Framework wiring for NestJS, React, Vite, Prisma, Redis, BullMQ, Jest, Vitest, Playwright, ESLint, and Prettier.
- Environment validation, error envelopes, correlation IDs, CI, Docker Compose, and startup smoke checks.

## Out of scope

- WhatsApp account onboarding, message sending, contacts, templates, campaigns, webhooks, billing, reporting, or analytics.
- Any endpoint, queue, schema model, UI flow, or background job that represents business behavior.
