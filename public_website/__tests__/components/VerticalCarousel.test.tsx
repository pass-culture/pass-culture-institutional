import React from 'react'
import { describe, expect, it } from 'vitest'

import { verticalCarouselFixtures } from '../fixtures/verticalCarousel'
import { render, screen } from '../index'
import { VerticalCarousel } from '@/lib/blocks/verticalCarousel/VerticalCarousel'

describe('header', () => {
  it('should display carousel title', async () => {
    render(<VerticalCarousel {...verticalCarouselFixtures} />)

    expect(screen.getByText('Slide 1')).toBeDefined()
  })

  it('should render correct number of items', async () => {
    render(<VerticalCarousel {...verticalCarouselFixtures} />)

    // Off-screen slides are rendered with `aria-hidden` and `inert` by
    // pure-react-carousel v3, so include hidden elements in the count.
    expect(screen.getAllByRole('link', { hidden: true }).length).toEqual(
      verticalCarouselFixtures.items.length
    )
  })
})
