/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
