/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ["@radix-ui/react-icons"],
  },
  eslint: {
      ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
