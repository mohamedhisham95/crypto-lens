import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  // devIndicators: false,
  images: {
    remotePatterns: [
      {
        hostname: 'coin-images.coingecko.com',
      },
    ],
  },
};

export default nextConfig;
