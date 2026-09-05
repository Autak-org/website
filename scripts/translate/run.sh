#!/usr/bin/bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$ROOT"

IS_FIRST_RUN=false
if [ ! -d ".venv" ]; then
  IS_FIRST_RUN=true
  echo "First run: creating Python virtual environment (.venv)…"
  python3 -m venv .venv
fi

# shellcheck disable=SC1091
source .venv/bin/activate

if [ "$IS_FIRST_RUN" = true ] || [ ! -f .venv/.translate-deps-ok ]; then
  echo "Installing translation dependencies…"
  pip install -r requirements.txt
  touch .venv/.translate-deps-ok
fi

python scripts/translate/main.py "$@"
deactivate
