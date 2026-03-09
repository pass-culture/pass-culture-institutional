import { Dispatch, SetStateAction, useEffect, useState } from 'react'

declare global {
  interface Window {
    _axcb: unknown[]
  }
}

export type VendorConsent = {
  firebase: boolean
  tolkai: boolean
}

type AxeptioSDK = {
  hasAcceptedVendor: (vendor: string) => boolean
  on: (event: string, handler: () => void) => void
}

const readVendors = (
  sdk: AxeptioSDK,
  setAcceptedVendors: Dispatch<SetStateAction<VendorConsent>>
) => {
  setAcceptedVendors({
    firebase: sdk.hasAcceptedVendor('googlefirebase'),
    tolkai: sdk.hasAcceptedVendor('Tolkai'),
  })
}

const getAcceptedVendors = (
  setAcceptedVendors: Dispatch<SetStateAction<VendorConsent>>
) => {
  window._axcb = window._axcb || []
  window._axcb.push(function (sdk: unknown) {
    if (
      typeof sdk === 'object' &&
      sdk !== null &&
      'hasAcceptedVendor' in sdk &&
      typeof sdk['hasAcceptedVendor'] === 'function'
    ) {
      const axeptioSdk = sdk as AxeptioSDK
      readVendors(axeptioSdk, setAcceptedVendors)
      axeptioSdk.on('cookies:complete', () =>
        readVendors(axeptioSdk, setAcceptedVendors)
      )
    }
  })
}

export const useConsent = () => {
  const [acceptedVendors, setAcceptedVendors] = useState<VendorConsent>({
    firebase: false,
    tolkai: false,
  })

  useEffect(() => {
    getAcceptedVendors(setAcceptedVendors)
  }, [])

  return acceptedVendors
}
