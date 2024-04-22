import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: 'https://243b7abda6774f78805e4684f77c6d9d@sentry.passculture.team/12',

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
})
