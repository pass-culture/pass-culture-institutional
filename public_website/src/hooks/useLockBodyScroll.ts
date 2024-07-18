import { useEffect } from 'react'

function useLockBodyScroll(lock: boolean = true) {
  useEffect(() => {
    if (typeof document === 'undefined') {
      return
    }

    const originalStyle = window.getComputedStyle(document.body).overflow
    if (lock) {
      document.body.style.overflow = 'hidden'
    }

    return () => {
      if (lock) {
        document.body.style.overflow = originalStyle
      }
    }
  }, [lock])
}

export default useLockBodyScroll
