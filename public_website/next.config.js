/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
    // Remove `data-text*` attributes from production build
    // Not supported by Turbopack :(
    // reactRemoveProperties: true,
  },
  images: { unoptimized: true },
}

module.exports = nextConfig
