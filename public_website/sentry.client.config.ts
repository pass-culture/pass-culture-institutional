// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: 'https://243b7abda6774f78805e4684f77c6d9d@sentry.passculture.team/12',
  tracesSampleRate: 0.1,
  debug: false,
  replaysSessionSampleRate: 0.0,
  replaysOnErrorSampleRate: 0.1,
  sampleRate: 0.1,
  integrations: [
    Sentry.replayIntegration({
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],
})
