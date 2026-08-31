import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static-assets-web.flixcart.com",
        pathname: "/**", // Allows all paths under this domain
      },
      {
        protocol: "https",
        hostname: "rukminim1.flixcart.com",
        pathname: "/**", // Allows all paths under this domain
      },
      {
        protocol: "https",
        hostname: "rukminim2.flixcart.com",
        pathname: "/**", // Allows all paths under this domain
      },
    ],
  },
};

export default nextConfig;
