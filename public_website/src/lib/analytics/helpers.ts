import { analyticsProvider, EventMap, eventMapKeys } from './analyticsProvider'

export function isKeyOfEventMap(key: string): key is keyof EventMap {
  return key in eventMapKeys
}

export const onClickCTA = (cta: { eventName: string; eventOrigin: string }) => {
  if (isKeyOfEventMap(cta.eventName)) {
    analyticsProvider.logEvent(cta.eventName, {
      origin: cta.eventOrigin,
    })
  } else {
    // If the eventName is not in EventMap, do not send to Firebase and log to Sentry
    return undefined
  }
}
