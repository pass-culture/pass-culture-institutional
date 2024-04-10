/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
    // Remove `data-text*` attributes from production build
    // Not supported by Turbopack :(
    // reactRemoveProperties: true,
  },
  images: { unoptimized: true },
}

if (process.env.NEXT_PUBLIC_EXPORT_MODE === 'true') {
  nextConfig.output = 'export'
}

module.exports = nextConfig
