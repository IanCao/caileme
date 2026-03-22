#!/bin/bash
set -e

cd "$(dirname "$0")"

echo "📦 Packaging SCF function..."
zip -r scf-proxy.zip index.js
echo ""
echo "🚀 Upload scf-proxy.zip to Tencent Cloud Console"
echo ""
echo "   Function name: caileme-api-proxy"
echo "   Runtime: Node.js 16"
echo "   Handler: index.main_handler"
echo ""
echo "   Environment variables:"
echo "     CF_WORKER_URL=https://caileme-api.<subdomain>.workers.dev"
echo "     CF_AUTH_TOKEN=<your-token>"
echo ""
echo "   API Gateway trigger:"
echo "     Path: /api/{proxy+}"
echo "     Method: ANY"
