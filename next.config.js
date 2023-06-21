/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: process.env.INITIAL_ROUTE || '/backoffice',
        permanent: false,
      },
    ]
  }
}

module.exports = nextConfig
