/** @type {import('next').NextConfig} */
const nextConfig = {
  // Smaller chunks can load faster and avoid timeout on first load
  experimental: {
    optimizePackageImports: ['@wix/sdk', '@wix/data'],
  },
};

export default nextConfig;
