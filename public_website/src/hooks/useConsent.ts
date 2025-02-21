import { Dispatch, SetStateAction, useEffect, useState } from 'react'

declare global {
  interface Window {
    _axcb: unknown[]
  }
}

const getAcceptedVendors = (
  setAcceptedVendors: Dispatch<SetStateAction<Record<string, boolean>>>
) => {
  window._axcb = window._axcb || []
  window._axcb.push(function (sdk: unknown) {
    if (
      typeof sdk === 'object' &&
      sdk !== null &&
      'hasAcceptedVendor' in sdk &&
      typeof sdk['hasAcceptedVendor'] === 'function'
    ) {
      setAcceptedVendors({
        firebase: sdk.hasAcceptedVendor('googlefirebase'),
      })
    }

    if (
      typeof sdk === 'object' &&
      sdk !== null &&
      'on' in sdk &&
      typeof sdk['on'] === 'function'
    ) {
      sdk.on('cookies:complete', function () {
        window.dispatchEvent(new Event('axeptioConsentAccepted'))
      })
    }
  })
}

export const useConsent = () => {
  const [acceptedVendors, setAcceptedVendors] = useState<
    Record<string, boolean>
  >({
    firebase: false,
  })

  useEffect(() => {
    getAcceptedVendors(setAcceptedVendors)
  }, [])

  return acceptedVendors
}
