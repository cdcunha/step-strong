/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Enable the webpack configuration to handle SVG files
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  // Configure images for Vercel
  images: {
    domains: ['vercel.com', 'step-strong.vercel.app', 'step-strong-vqnu.vercel.app'],
    unoptimized: true, // Required for static exports
  },
  // Enable static exports for Vercel
  output: 'export',
  // Optional: Add base path if using a custom domain
  // basePath: '/your-base-path',
  // Optional: Configure the build output directory
  distDir: '.next',
};

module.exports = nextConfig;
