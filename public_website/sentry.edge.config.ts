// Note that this config is unrelated to the Vercel Edge Runtime and is also required when running locally.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: 'https://243b7abda6774f78805e4684f77c6d9d@sentry.passculture.team/12',
  tracesSampleRate: 1,
  debug: false,
})
