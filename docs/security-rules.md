# Security Rules

## Secrets

Never commit real credentials. `.env.example` may contain safe local defaults only.

## Configuration

Environment variables must be validated at startup so misconfigured services fail early. Production deployments should provide secrets through the platform secret manager.

## API safety

The API uses request correlation IDs and consistent error responses to support incident investigation without leaking stack traces or sensitive implementation details.

## Dependencies

Use real maintained packages with explicit semver ranges. Security updates should keep the lockfile reproducible and preserve acceptance criteria.
