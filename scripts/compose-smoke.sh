#!/usr/bin/env bash
set -euo pipefail
trap 'docker compose down --volumes --remove-orphans' EXIT

wait_for_exec() {
  local service="$1"
  local command="$2"
  local attempts=40
  for _ in $(seq 1 "$attempts"); do
    if docker compose exec -T "$service" sh -c "$command" >/dev/null 2>&1; then
      return 0
    fi
    sleep 1
  done
  echo "Timed out waiting for $service readiness" >&2
  docker compose logs "$service" >&2 || true
  return 1
}

docker compose config >/dev/null
docker compose up -d postgres redis api worker web

wait_for_exec api "node -e \"fetch('http://127.0.0.1:3000/docs').then((r)=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))\""
wait_for_exec web "node -e \"fetch('http://127.0.0.1:5173/').then((r)=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))\""

for _ in $(seq 1 40); do
  if docker compose logs worker 2>/dev/null | grep -q 'Worker application context ready.'; then
    exit 0
  fi
  sleep 1
done

echo 'Timed out waiting for worker readiness log' >&2
docker compose logs worker >&2 || true
exit 1
