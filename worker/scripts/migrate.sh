#!/bin/bash
set -e

cd "$(dirname "$0")/.."

echo "🗄️ Running migrations against remote D1..."
npx wrangler d1 execute caileme-db --remote --file=migrations/0001_init.sql
echo ""
echo "✅ Remote migration complete."
