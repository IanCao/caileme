# Contributing

Thanks for helping improve Caileme.

## Project shape

- `app/` contains the Next.js app and produces a static export
- `functions/` contains Cloudflare Pages Functions, including the optional AI endpoint
- `dist/` is the root build output used for Cloudflare Pages deployment

## Local development

1. Install dependencies from the repository root with `npm install`
2. Start the app with `npm run dev`
3. For AI features in local Next.js development, the UI falls back to built-in responses if the Pages Function is not running

## Cloudflare deployment

1. Set `CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_API_TOKEN`, and optionally `CLOUDFLARE_AI_MODEL` in the Cloudflare Pages project settings
2. Build from the repository root with `npm run build`
3. Preview locally with `npm run preview`
4. Deploy with `npm run deploy`

## Pull requests

- Keep changes focused
- Update documentation when behavior or setup changes
- Do not commit secrets, local env files, or build artifacts
- If you change legal or data content, include sources when possible
