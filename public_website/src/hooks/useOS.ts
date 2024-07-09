import { useEffect, useRef } from 'react'

/**
 * Checks if user is on an Android or IOS device
 */
export function useOS(): { isAndroid: boolean; isIos: boolean } {
  const isAndroid = useRef<boolean>(false)
  const isIos = useRef<boolean>(false)

  useEffect(() => {
    isAndroid.current = /android/i.test(navigator.userAgent)
    isIos.current = /iPad|iPhone|iPod/.test(navigator.userAgent)
  })

  return { isAndroid: isAndroid.current, isIos: isIos.current }
}
