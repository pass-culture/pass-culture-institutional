import { useEffect, useState } from 'react'

declare global {
  interface Window {
    _axcb: unknown[]
  }
}

export const useConsent = () => {
  const [acceptedVendors, setAcceptedVendors] = useState<
    Record<string, boolean>
  >({ firebase: false })

  const getAcceptedVendors = async () => {
    window._axcb = window._axcb || []
    window._axcb.push(function (sdk: unknown) {
      if (
        typeof sdk === 'object' &&
        sdk !== null &&
        'hasAcceptedVendor' in sdk
      ) {
        setAcceptedVendors({
          firebase: (
            sdk as { hasAcceptedVendor: (vendor: string) => boolean }
          ).hasAcceptedVendor('googlefirebase'),
        })
      }
    })
  }

  useEffect(() => {
    getAcceptedVendors()
  }, [])

  return acceptedVendors
}
