import { useEffect, useRef } from 'react'

/**
 * Checks if user is on an Android device
 */
export function useIsAndroid(): boolean {
  const isAndroid = useRef(false)

  useEffect(() => {
    isAndroid.current = /android/i.test(navigator.userAgent)
  })

  return isAndroid.current
}
