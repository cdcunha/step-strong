/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    experimental: {
      appDir: true,
    },
    webpack(config) {
      config.module.rules.push({
        test: /\.svg$/i,
        use: ['@svgr/webpack'],
      });
      return config;
    },
    images: {
      unoptimized: true,
    },
  };
  
  export default nextConfig;
  