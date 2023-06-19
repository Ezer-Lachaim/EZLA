/** @type {import('next').NextConfig} */
const nextConfig = {
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
