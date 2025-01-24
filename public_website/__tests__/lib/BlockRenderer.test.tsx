import React from 'react'
import { describe, expect, it } from 'vitest'

import { render, screen } from '..'
import { BlockRenderer } from '@/lib/BlockRenderer'
import { PageQuery } from '@/generated/graphql'

describe('BlockRenderer', () => {
  it('should render the correct block', () => {
    const block: NonNullable<
      NonNullable<NonNullable<PageQuery['pages'][number]>['Blocks']>[number]
    > = {
      __typename: 'ComponentBlockHeaderTest' as 'ComponentBlockBreadcrumb',
      id: '1',
    }

    render(<BlockRenderer block={block} />)

    expect(screen.getByTestId('header')).toBeTruthy()
  })

  it('should render the unknown block', () => {
    const block: NonNullable<
      NonNullable<NonNullable<PageQuery['pages'][number]>['Blocks']>[number]
    > = {
      __typename: 'Error',
    }

    render(<BlockRenderer block={block} />)

    expect(screen.getByTestId('unknown-block')).toBeTruthy()
  })
})
