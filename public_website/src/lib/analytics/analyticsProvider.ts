import {
  Analytics,
  getAnalytics,
  isSupported,
  logEvent,
} from 'firebase/analytics'
import { initializeApp } from 'firebase/app'

import { analyticsConfig } from '@/lib/analytics/config'

let analyticsInstance: Analytics
let initPromise: Promise<void> | null = null

export type EventMap = {
  testEvent: { origin: 'testOrigin' }
  goToSignUpNative: {
    origin:
      | 'header'
      | 'home'
      | 'menu-young-people-and-parents'
      | 'get-your-credit'
      | 'simulator'
  }
  goToSignUpPro: {
    origin: 'header' | 'menu-pros' | 'essential-pros' | 'how-to-propose-offers'
  }
  goToLoginNative: { origin: 'header' }
  goToLoginPro: { origin: 'header' }
  downloadApp: { origin: 'home' | 'menu-young-people-and-parents' | 'footer' }
  goToFaqNative: {
    origin: 'get-your-credit' | 'help-young-people-and-parents' | 'parents'
  }
  goToFaqPro: { origin: 'help-pros' }
  contactSupport: { origin: 'help-pros' | 'help-teachers' }
  pageView: { origin: string }
}

export const eventMapKeys = {
  testEvent: true,
  goToSignUpNative: true,
  goToSignUpPro: true,
  goToLoginNative: true,
  goToLoginPro: true,
  downloadApp: true,
  goToFaqNative: true,
  goToFaqPro: true,
  contactSupport: true,
  pageView: true,
}

export enum eventOriginsEnum {
  header = 'header',
  home = 'home',
  'get-your-credit' = 'get-your-credit',
  simulator = 'simulator',
  'menu-pros' = 'menu-pros',
  'essential-pros' = 'essential-pros',
  'how-to-propose-offers' = 'how-to-propose-offers',
  'menu-young-people-and-parents' = 'menu-young-people-and-parents',
  footer = 'footer',
  'help-young-people-and-parents' = 'help-young-people-and-parents',
  parents = 'parents',
  'help-pros' = 'help-pros',
  'help-teachers' = 'help-teachers',
}

export const analyticsProvider = {
  init: () => {
    if (initPromise) return initPromise

    initPromise = (async () => {
      try {
        const supported = await isSupported()
        if (!supported) {
          console.warn(
            'Firebase Analytics is not supported in this environment'
          )
          return
        }
        const app = initializeApp(analyticsConfig)
        analyticsInstance = getAnalytics(app)
      } catch (error) {
        console.error('Error initializing Firebase Analytics:', error)
      }
    })()

    return initPromise
  },
  logEvent: <K extends keyof EventMap>(eventName: K, options: EventMap[K]) => {
    if (analyticsInstance) {
      logEvent(analyticsInstance, eventName, options as Record<string, unknown>)
      return
    }

    if (initPromise) {
      initPromise.then(() => {
        if (analyticsInstance) {
          logEvent(
            analyticsInstance,
            eventName,
            options as Record<string, unknown>
          )
        } else {
          console.warn(
            'Firebase Analytics not initialized. Event not logged:',
            eventName
          )
        }
      })
      return
    }

    console.warn(
      'Firebase Analytics not initialized. Event not logged:',
      eventName
    )
  },
}
