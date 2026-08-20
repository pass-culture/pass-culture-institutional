/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  // Pin the Turbopack root to this app: the monorepo has multiple lockfiles
  // and Next would otherwise infer the wrong workspace root.
  turbopack: { root: __dirname },
  compiler: {
    styledComponents: true,
    // Remove `data-text*` attributes from production build
    // Not supported by Turbopack :(
    // reactRemoveProperties: true,
  },
  images: { unoptimized: true },
}

module.exports = nextConfig
