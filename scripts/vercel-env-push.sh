#!/usr/bin/env bash
# Push env vars from a local dotenv file into Vercel (production target).
#
# Usage:
#   scripts/vercel-env-push.sh                 # push to production, skip existing
#   scripts/vercel-env-push.sh --force         # overwrite existing vars
#   scripts/vercel-env-push.sh --target preview
#   scripts/vercel-env-push.sh --file .env.production.local --target production
#
# Requires:
#   - `npx vercel login` already done
#   - `npx vercel link` already done (.vercel/ present in repo root)
#   - vercel CLI available via `npx vercel` (no global install needed)
#
# Skips: blank lines, comments, empty values.
# Does NOT commit any secrets to git — reads values from the local dotenv file only.

set -euo pipefail

ENV_FILE=".env.production.local"
TARGET="production"
FORCE=false

while [[ $# -gt 0 ]]; do
  case "$1" in
    --force)   FORCE=true; shift ;;
    --file)    ENV_FILE="$2"; shift 2 ;;
    --target)  TARGET="$2"; shift 2 ;;
    -h|--help)
      sed -n '2,15p' "$0"; exit 0 ;;
    *)
      echo "Unknown arg: $1" >&2; exit 1 ;;
  esac
done

if [[ ! -f "$ENV_FILE" ]]; then
  echo "Error: $ENV_FILE not found" >&2
  exit 1
fi

if [[ ! -d ".vercel" ]]; then
  echo "Error: project not linked. Run: npx vercel link" >&2
  exit 1
fi

echo "Pushing env vars from $ENV_FILE → Vercel '$TARGET'"
echo "Force overwrite: $FORCE"
echo ""

added=0
skipped=0
overwritten=0
empty=0

while IFS= read -r line || [[ -n "$line" ]]; do
  # Skip blanks and comments
  [[ -z "${line// }" ]] && continue
  [[ "$line" =~ ^[[:space:]]*# ]] && continue

  # Split NAME=VALUE on the first =
  name="${line%%=*}"
  value="${line#*=}"

  # Trim whitespace around name
  name="${name## }"; name="${name%% }"

  # Strip surrounding single or double quotes around value
  if [[ "$value" =~ ^\".*\"$ ]]; then
    value="${value:1:${#value}-2}"
  elif [[ "$value" =~ ^\'.*\'$ ]]; then
    value="${value:1:${#value}-2}"
  fi

  if [[ -z "$value" ]]; then
    echo "  ○ $name (empty — skipped)"
    empty=$((empty + 1))
    continue
  fi

  # Try to add. If it already exists, handle per --force flag.
  if printf '%s' "$value" | npx --yes vercel env add "$name" "$TARGET" >/dev/null 2>&1; then
    echo "  + $name"
    added=$((added + 1))
  else
    if $FORCE; then
      npx --yes vercel env rm "$name" "$TARGET" --yes >/dev/null 2>&1 || true
      if printf '%s' "$value" | npx --yes vercel env add "$name" "$TARGET" >/dev/null 2>&1; then
        echo "  ↻ $name (overwritten)"
        overwritten=$((overwritten + 1))
      else
        echo "  ✗ $name (failed to overwrite)"
      fi
    else
      echo "  · $name (exists — skipped; --force to overwrite)"
      skipped=$((skipped + 1))
    fi
  fi
done < "$ENV_FILE"

echo ""
echo "Summary: $added added, $skipped skipped, $overwritten overwritten, $empty empty"
