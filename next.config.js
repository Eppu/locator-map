/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'vignette.wikia.nocookie.net',
        port: '',
      },
    ],
  },
};

module.exports = nextConfig;
