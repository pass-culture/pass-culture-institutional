type WindowSize<T extends number | undefined = number | undefined> = {
  width: T
  height: T
}

type UseWindowSizeOptions = {
  debounceDelay?: number
}
import { useEffect, useState } from 'react'

import { useDebounceCallback } from './useDebounceCallback'

export const useWindowSize = (
  options: UseWindowSizeOptions = {}
): WindowSize | WindowSize<number> => {
  const [windowSize, setWindowSize] = useState<WindowSize>(() => {
    return {
      width: 0,
      height: 0,
    }
  })
  const debouncedSetWindowSize = useDebounceCallback(
    setWindowSize,
    options.debounceDelay as number
  )
  const handleSize = (): void => {
    const setSize = options.debounceDelay
      ? debouncedSetWindowSize
      : setWindowSize

    setSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }

  useEffect(() => {
    handleSize()
    window.addEventListener('resize', handleSize)

    return () => window.removeEventListener('resize', handleSize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return windowSize
}
