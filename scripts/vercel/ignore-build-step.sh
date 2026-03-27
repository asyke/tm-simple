#!/bin/bash

BRANCH="${VERCEL_GIT_COMMIT_REF:-${VERCEL_GIT_BRANCH:-}}"

echo "Branch is: $BRANCH"

if [[ "$BRANCH" == "vercel" || "$BRANCH" == "feature/test-preview" || "$BRANCH" == feature/test-preview-* ]]; then
  echo "✅ Build allowed"
  exit 1
else
  echo "❌ Skipping build"
  exit 0
fi
