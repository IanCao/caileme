/** @type {import('next').NextConfig} */
const nextConfig = {
  // Cloudflare Pages 支持 SSR 模式，不需要 output: 'export'
  images: {
    unoptimized: true,
  },
  // 支持 Cloudflare Pages 边缘部署
  experimental: {
    // 启用 serverActions 用于表单处理
    serverActions: {
      allowedOrigins: ['caileme.pages.dev', 'caileme.com'],
    },
  },
  // Cloudflare Pages 部署配置
  env: {
    // 这些会在构建时注入
  },
};

module.exports = nextConfig;
