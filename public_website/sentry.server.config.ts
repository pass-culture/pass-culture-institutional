// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: 'https://243b7abda6774f78805e4684f77c6d9d@sentry.passculture.team/12',
  tracesSampleRate: 1,
  debug: false,
  sampleRate: 0.1,
})
