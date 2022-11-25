/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nextlevel.worldmanager.com'
      },
    ],
  },
}

module.exports = nextConfig
