import { useEffect } from 'react'

function useLockBodyScroll(lock: boolean = true) {
  useEffect(() => {
    if (typeof document === 'undefined') {
      return
    }
    const setOverFlowBody = () =>
      (document.body.style.overflow = lock ? 'hidden' : '')

    setOverFlowBody()
    return () => {
      setOverFlowBody()
    }
  }, [lock])
}

export default useLockBodyScroll
