import { analyticsProvider, EventMap, eventMapKeys } from './analyticsProvider'

function isKeyOfEventMap(key: string): key is keyof EventMap {
  return key in eventMapKeys
}

export const onClickAnalytics = (cta: {
  eventName?: string
  eventOrigin?: string
}) => {
  if (cta.eventName && cta.eventOrigin && isKeyOfEventMap(cta.eventName)) {
    analyticsProvider.logEvent(cta.eventName, {
      origin: cta.eventOrigin,
    })
  } else {
    // When Sentry is added to project: If the eventName is not in EventMap, do not send to Firebase and log to Sentry
    return undefined
  }
}
