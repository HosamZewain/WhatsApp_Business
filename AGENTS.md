# Agent Instructions

This repository is a TypeScript monorepo for the WhatsApp Business platform foundation.

- Do not implement Issue #1 or business-specific messaging features while working on foundation issues.
- Keep NestJS, React, Vite, Prisma, Redis, BullMQ, Jest, Vitest, Playwright, ESLint, and Prettier as real dependencies.
- Run `npm run verify` before committing when dependencies are available.
- Keep shared contracts in `packages/shared` and import them from applications instead of duplicating types.
