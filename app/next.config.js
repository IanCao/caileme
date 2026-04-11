/** @type {import('next').NextConfig} */
const nextConfig = {
  // Cloudflare Pages 支持
  images: {
    unoptimized: true,
  },
  // 支持 Cloudflare Pages 边缘部署
  experimental: {
    serverActions: {
      allowedOrigins: ['caileme.pages.dev', 'caileme.com'],
    },
    // 优化打包大小
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
  // 减小 webpack chunk 大小
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization.splitChunks = {
        ...config.optimization.splitChunks,
        maxInitialSize: 500000, // 500KB
        maxAsyncSize: 500000,   // 500KB
        cacheGroups: {
          ...config.optimization.splitChunks?.cacheGroups,
          // 把大库单独打包
          vendor: {
            test: /[\\/]node_modules[\\/](framer-motion|lucide-react|react-dom)[\\/]/,
            name: 'vendor',
            chunks: 'all',
            priority: 20,
          },
        },
      };
    }
    return config;
  },
};

module.exports = nextConfig;
