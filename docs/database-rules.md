# Database Rules

## Prisma

Prisma is the database schema and client generation tool for the API. Use `npm run prisma:generate --workspace @whatsapp-business/api` after schema changes.

## Schema changes

- Keep Issue #3 schema empty of business models.
- Do not add tables for health checks, messages, contacts, templates, campaigns, or analytics without an approved issue.
- Do not commit generated Prisma client artifacts unless repository policy changes.

## Migrations

Future migration files must be reviewed as part of the issue that introduces the corresponding schema change. Migrations should be deterministic and reversible where practical.
