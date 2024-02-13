import React, { useEffect, useRef } from 'react'

// Based on https://hiddedevries.nl/en/blog/2017-01-29-using-javascript-to-trap-focus-in-an-element
function useFocusTrap() {
  const elementRef = useRef<HTMLDivElement>(null)

  function handleFocus(e: KeyboardEvent | React.KeyboardEvent) {
    const focusableElements = elementRef.current?.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    )

    if (!focusableElements || e.key !== 'Tab') {
      return
    }

    const firstFocusableElement = focusableElements[0] as HTMLElement
    const lastFocusableElement = focusableElements[
      focusableElements.length - 1
    ] as HTMLElement

    // SHIFT + TAB
    if (e.shiftKey) {
      if (document.activeElement === firstFocusableElement) {
        lastFocusableElement?.focus()
        e.preventDefault()
      }
      // TAB only
    } else {
      if (document.activeElement === lastFocusableElement) {
        firstFocusableElement?.focus()
        e.preventDefault()
      }
    }
  }

  useEffect(() => {
    const currentElement = elementRef.current
    currentElement?.addEventListener('keydown', handleFocus)

    return () => {
      currentElement?.removeEventListener('keydown', handleFocus)
    }
  }, [])

  return elementRef
}

export function FocusTrap({ children }: { children: React.ReactNode }) {
  const elementRef = useFocusTrap()

  return <div ref={elementRef}>{children}</div>
}
