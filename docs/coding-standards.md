# Coding Standards

## TypeScript

- Keep `strict` TypeScript enabled across every workspace.
- Prefer explicit return types for public APIs, providers, and exported functions.
- Keep shared contracts framework-neutral and place them in `packages/shared`.

## Formatting and linting

- Use Prettier for formatting and `npm run format:check` to validate formatting.
- Use ESLint for static checks; do not bypass lint rules without a documented reason.
- Avoid `try/catch` blocks around imports.

## Scope control

Foundation changes must not introduce business entities, messaging workflows, or external WhatsApp behavior.
