/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
    // Remove `data-text*` attributes from production build
    reactRemoveProperties: true,
  },
  images: { unoptimized: true },
}

module.exports = nextConfig
