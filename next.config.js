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
  // Add support for static exports
  output: 'export',
  // Configure images for static export
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
