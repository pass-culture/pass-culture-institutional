import React from 'react'
import { it } from 'vitest'
import { describe } from 'vitest'

import { render } from '..'
import BlockRenderer from '@/lib/BlockRenderer'

describe('BlockRenderer', () => {
  it('should render the correct block', () => {
    const block = {
      __component: 'block.header',
      Title: 'The title',
      Text: 'Some longer text',
    }

    const { getByTestId } = render(<BlockRenderer block={block} />)

    getByTestId('header')
  })

  it('should render the unknown block', () => {
    const block = { __component: 'some.unkwnown.block', foo: 'bar' }

    const { getByTestId } = render(<BlockRenderer block={block} />)

    getByTestId('unknown-block')
  })
})
