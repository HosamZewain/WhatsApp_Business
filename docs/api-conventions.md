# API Conventions

## HTTP surface

Issue #3 does not define business endpoints. Future endpoints must be introduced by their own scoped issues and documented in Swagger/OpenAPI.

## Errors

Errors should use a consistent JSON envelope containing status code, message, path, correlation ID, and timestamp.

## Correlation IDs

Every request should accept or generate `x-correlation-id` and return it in the response headers. Logs and downstream jobs should preserve this value when applicable.

## Validation

Use NestJS validation pipes and explicit environment validation. Reject unknown or malformed input at the boundary before it reaches business logic.
