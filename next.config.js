/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        port: '',
        pathname: '/wikipedia/commons/**',
      },
    ],
  },
  // For Vercel deployment
  trailingSlash: false,
  experimental: {
    optimizeCss: true,
  },
};

module.exports = nextConfig;
