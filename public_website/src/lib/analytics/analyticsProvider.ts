import { Analytics, getAnalytics, logEvent } from 'firebase/analytics'
import { initializeApp } from 'firebase/app'

import { analyticsConfig } from '@/lib/analytics/config'

let analyticsInstance: Analytics

export type EventMap = {
  testEvent: { param: string }
  goToSignup: { origin: string }
  // ... add other event types here ...
}

export const eventMapKeys: { [K in keyof EventMap]: true } = {
  testEvent: true,
  goToSignup: true,
  // ... add other event types here ...
}

export const analyticsProvider = {
  init: () => {
    const app = initializeApp(analyticsConfig)
    analyticsInstance = getAnalytics(app)
  },
  logEvent: <K extends keyof EventMap>(eventName: K, options: EventMap[K]) =>
    logEvent<string>(analyticsInstance, eventName, options),
}
