#!/usr/bin/env bash
set -euo pipefail
trap 'docker compose down --volumes --remove-orphans' EXIT

docker compose config >/dev/null
docker compose up -d postgres redis api worker web

docker compose exec -T api node -e "setTimeout(() => process.exit(0), 1000)"
docker compose exec -T worker node -e "setTimeout(() => process.exit(0), 1000)"
docker compose exec -T web node -e "setTimeout(() => process.exit(0), 1000)"

docker compose ps --status running api worker web
