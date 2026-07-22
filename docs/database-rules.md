# database rules

This document is part of the Issue #3 foundation and defines project guardrails without implementing Issue #1 business behavior.

## Rules

- Keep the API in NestJS, the web app in React with Vite, and background processing in the worker app.
- Keep shared types and constants in `packages/shared`.
- Prefer strict TypeScript, automated tests, and documented environment configuration.
