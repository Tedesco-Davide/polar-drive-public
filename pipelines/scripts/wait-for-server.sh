#!/usr/bin/env bash
# Usato dallo stage Test (job Selenium) per attendere che il sito Next.js
# (avviato in background con "npm run start") risponda prima di lanciare
# i test, che si aspettano http://localhost:3000 già raggiungibile.
set -euo pipefail

URL="${1:?Uso: wait-for-server.sh <url> [timeout_seconds]}"
TIMEOUT="${2:-60}"
ELAPSED=0

echo "Attendo che $URL risponda (timeout ${TIMEOUT}s)..."
until curl --output /dev/null --silent --fail "$URL"; do
    if [ "$ELAPSED" -ge "$TIMEOUT" ]; then
        echo "Timeout: $URL non ha risposto entro ${TIMEOUT}s."
        exit 1
    fi
    sleep 2
    ELAPSED=$((ELAPSED + 2))
done

echo "$URL raggiungibile."
