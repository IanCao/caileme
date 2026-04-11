/** @type {import('next').NextConfig} */
const nextConfig = {
  // 静态导出用于 Cloudflare Pages
  output: 'export',
  
  images: {
    unoptimized: true,
  },
  // 优化打包大小
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
};

module.exports = nextConfig;
