/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/nerve-assignment',
  assetPrefix: '/nerve-assignment',
  trailingSlash: true, // This helps with routing on GitHub Pages
  images: {
    unoptimized: true,
  },
};

export default nextConfig;