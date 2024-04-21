import {
  analyticsProvider,
  EventMap,
  eventMapKeys,
  eventOriginsEnum,
} from './analyticsProvider'

function isEventNameInEventMap(eventName: string): eventName is keyof EventMap {
  return eventName in eventMapKeys
}
function isOriginInEventMapOrigin(
  origin: string
): origin is EventMap[keyof EventMap]['origin'] {
  return eventOriginsEnum[origin as keyof typeof eventOriginsEnum] !== undefined
}

export const onClickAnalytics = (cta: {
  eventName?: string
  eventOrigin?: string
}) => {
  if (
    cta.eventName &&
    isEventNameInEventMap(cta.eventName) &&
    cta.eventOrigin &&
    isOriginInEventMapOrigin(cta.eventOrigin)
  ) {
    analyticsProvider.logEvent(cta.eventName, {
      origin: cta.eventOrigin,
    })
  } else {
    // When Sentry is added to project: If the eventName is not in EventMap, do not send to Firebase and log to Sentry
    return undefined
  }
}
