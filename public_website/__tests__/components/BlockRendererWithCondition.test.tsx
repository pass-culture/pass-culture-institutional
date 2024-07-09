import React from 'react'
import { describe, expect, it } from 'vitest'

import { render, screen } from '../index'
import BlockRendererWithCondition from '@/lib/BlockRendererWithCondition'

describe('BlockRendererWithCondition', () => {
  it('should render children when condition is true', () => {
    render(
      <BlockRendererWithCondition condition={true}>
        <div>Visible Content</div>
      </BlockRendererWithCondition>
    )
    expect(screen.getByText('Visible Content')).toBeDefined()
  })

  it('should not render children when condition is false', () => {
    render(
      <BlockRendererWithCondition condition={false}>
        <div>Hidden Content</div>
      </BlockRendererWithCondition>
    )
    expect(screen.queryByText('Hidden Content')).toBeNull()
  })
})
