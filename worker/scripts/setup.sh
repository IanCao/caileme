#!/bin/bash
set -e

cd "$(dirname "$0")/.."

echo "🔧 Creating D1 database..."
npx wrangler d1 create caileme-db
echo ""
echo "📝 Copy the database_id from above into wrangler.toml"
echo "   Replace YOUR_DATABASE_ID_HERE with the actual ID"
echo ""
echo "🗄️ Running migrations (local)..."
npx wrangler d1 execute caileme-db --local --file=migrations/0001_init.sql
echo ""
echo "🚀 Deploying worker..."
npx wrangler deploy
echo ""
echo "✅ Done! Test with:"
echo "   curl https://caileme-api.<your-subdomain>.workers.dev/api/health"
