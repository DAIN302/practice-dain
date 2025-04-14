/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    deviceSizes: [640, 750, 828, 1100, 1200, 1920],
    imageSizes: [32, 48, 64, 96, 128, 256, 384],
  },
};

module.exports = nextConfig;
