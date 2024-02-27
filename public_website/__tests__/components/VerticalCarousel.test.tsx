import React from 'react'
import { describe, expect, it } from 'vitest'

import { verticalCarouselFixtures } from '../fixtures/verticalCarousel'
import { render, screen } from '../index'
import { VerticalCarousel } from '@/ui/components/verticalCarousel/VerticalCarousel'

describe('header', () => {
  it('should display carousel title', async () => {
    render(<VerticalCarousel {...verticalCarouselFixtures} />)

    expect(screen.getByText('Slide 1')).toBeDefined()
  })

  it('should render correct number of items', async () => {
    render(<VerticalCarousel {...verticalCarouselFixtures} />)

    expect(screen.getAllByRole('heading', { level: 3 }).length).toEqual(
      verticalCarouselFixtures.items.length
    )
  })
})
