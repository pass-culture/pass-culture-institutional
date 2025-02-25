import {
  analyticsProvider,
  EventMap,
  eventMapKeys,
  eventOriginsEnum,
} from '../lib/analytics/analyticsProvider'
import { useConsent } from '@/hooks/useConsent'

function isEventNameInEventMap(eventName: string): eventName is keyof EventMap {
  return eventName in eventMapKeys
}
function isOriginInEventMapOrigin(
  origin: string
): origin is EventMap[keyof EventMap]['origin'] {
  return eventOriginsEnum[origin as keyof typeof eventOriginsEnum] !== undefined
}

export const useOnClickAnalytics = () => {
  const acceptedVendors = useConsent()

  const onClickAnalytics = (cta: {
    eventName?: string
    eventOrigin?: string
  }) => {
    if (!acceptedVendors['firebase']) return

    if (cta.eventName === 'pageView' && cta.eventOrigin) {
      analyticsProvider.logEvent(cta.eventName, {
        origin: cta.eventOrigin,
      })
    }
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

  return { onClickAnalytics }
}
