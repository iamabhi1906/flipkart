import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static-assets-web.flixcart.com',
        pathname: '/**', // Allows all paths under this domain
      },
    ],
  },
};

export default nextConfig;
