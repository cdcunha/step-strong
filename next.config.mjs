/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Enable the webpack configuration to handle SVG files
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  // Configure images for static export
  images: {
    unoptimized: true,
  },
  // Enable CSS modules
  experimental: {
    appDir: true,
  },
};

export default nextConfig;
