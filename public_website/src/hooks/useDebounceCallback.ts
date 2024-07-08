import { useCallback, useRef } from 'react'

type UnaryVoidFunction<T> = (arg: T) => void
export const useDebounceCallback = <T>(
  func: UnaryVoidFunction<T>,
  wait: number
) => {
  const timeout = useRef<NodeJS.Timeout>()

  const debouncedFunc = (arg: T): void => {
    if (timeout.current) clearTimeout(timeout.current)
    timeout.current = setTimeout(() => func(arg), wait)
  }
  return useCallback(debouncedFunc, [func, wait])
}
