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
  
  // Image optimization
  images: {
    unoptimized: true, // Required for static exports
    domains: [
      'vercel.com',
      'step-strong.vercel.app',
      'step-strong-vqnu.vercel.app'
    ],
  },
  
  // Enable static exports
  output: 'export',
  
  // Enable React Strict Mode
  reactStrictMode: true,
  
  // Optional: Add base path if using a custom domain
  // basePath: '/your-base-path',
  
  // Configure the build output directory (Vercel will handle this automatically)
  distDir: '.next',
  
  // Add any other necessary configurations here
};

module.exports = nextConfig;
