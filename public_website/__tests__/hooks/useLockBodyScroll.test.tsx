import React from 'react'
import { describe, expect, it } from 'vitest'

import { render } from '../index'
import useLockBodyScroll from '@/hooks/useLockBodyScroll'

function TestComponent({ isLock }: { isLock: boolean }) {
  useLockBodyScroll(isLock)
  return <div>Content</div>
}

describe('useLockBodyScroll', () => {
  it('locks body scroll when active', () => {
    render(<TestComponent isLock />)
    expect(document.body.style.overflow).toBe('hidden')
  })

  it('restores original body scroll when not active', () => {
    render(<TestComponent isLock={false} />)
    expect(document.body.style.overflow).toBe('')
  })
})
