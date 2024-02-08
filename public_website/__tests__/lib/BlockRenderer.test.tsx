import React from 'react'
import { describe, expect, it } from 'vitest'

import { render, screen } from '..'
import BlockRenderer from '@/lib/BlockRenderer'

describe('BlockRenderer', () => {
  it('should render the correct block', () => {
    const block = {
      __component: 'block.header',
      Title: 'The title',
      Text: 'Some longer text',
    }

    render(<BlockRenderer block={block} />)

    expect(screen.getByTestId('header')).toBeTruthy()
  })

  it('should render the unknown block', () => {
    const block = { __component: 'some.unkwnown.block', foo: 'bar' }

    render(<BlockRenderer block={block} />)

    expect(screen.getByTestId('unknown-block')).toBeTruthy()
  })
})
