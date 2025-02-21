import { useEffect } from 'react'

import { useAxeptio } from './useAxeptio'
import { useConsent } from './useConsent'

declare global {
  interface Window {
    dataLayer: unknown[]
  }
}

export const useGoogleAnalytics = () => {
  // Load Axeptio and initialize consent
  useAxeptio()
  const consent = useConsent()

  const initGA = () => {
    // Check if GA script is already present
    if (document.getElementById('ga-script')) {
      return
    }
    const gaScript = document.createElement('script')
    gaScript.id = 'ga-script'
    gaScript.async = true
    gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-DRKRBS9YBB'
    document.head.appendChild(gaScript)

    window.dataLayer = window.dataLayer || []
    function gtag(...args: unknown[]) {
      window.dataLayer.push(args)
    }
    gtag('js', new Date())
    gtag('config', 'G-DRKRBS9YBB', { page_path: window.location.pathname })
  }

  // Initialize via hook when consent is updated
  useEffect(() => {
    if (consent['firebase']) {
      initGA()
    }
  }, [consent])

  // Listen to event to trigger GA immediately
  useEffect(() => {
    const handler = () => {
      initGA()
    }
    if (document.getElementById('ga-script')) {
      window.removeEventListener('axeptioConsentAccepted', handler)
      return
    }
    window.addEventListener('axeptioConsentAccepted', handler)
    return () => {
      window.removeEventListener('axeptioConsentAccepted', handler)
    }
  }, [])

  return null
}
