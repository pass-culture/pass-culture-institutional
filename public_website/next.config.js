/** @type {import('next').NextConfig} */

const { withSentryConfig } = require('@sentry/nextjs')

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
  sentry: {},
}

const sentryWebpackPluginOptions = {
  silent: true,
  org: 'sentry',
  project: 'institutional',
  url: 'https://sentry.passculture.team/',
  authToken: process.env.SENTRY_AUTH_TOKEN,
}

export default withSentryConfig(nextConfig, sentryWebpackPluginOptions)
