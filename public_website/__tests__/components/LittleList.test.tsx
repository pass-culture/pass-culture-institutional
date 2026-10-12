import React from 'react'
import { describe, expect, it } from 'vitest'

import { fireEvent, render, screen } from '../index'
import { LittleList } from '@/lib/blocks/LittleList'

const content = [
  {
    id: 1,
    text: 'Une application gratuite',
    description: null,
    firstEmoji: '🖼️',
    secondEmoji: '🙌',
    url: '/le-pass-culture-cest-quoi',
  },
  {
    id: 2,
    text: 'Une part individuelle et une part collective',
    description: 'Pour les jeunes et les enseignants',
    firstEmoji: '❤️',
    secondEmoji: '📚',
    url: null,
  },
]

describe('LittleList', () => {
  it('should make the items with a URL clickable', () => {
    render(<LittleList title="En synthèse" content={content} />)

    const link = screen.getByRole('link')
    expect(link.getAttribute('href')).toBe('/le-pass-culture-cest-quoi')
    expect(link.textContent).toContain('Une application gratuite')
    expect(screen.getByTestId('internal-link-icon')).toBeDefined()
  })

  it('should keep the collapsible behavior for items without URL', () => {
    render(<LittleList title="En synthèse" content={content} />)

    const text = screen.getByText(
      'Une part individuelle et une part collective'
    )
    expect(text.closest('a')).toBeNull()
    expect(screen.queryByText('Pour les jeunes et les enseignants')).toBeNull()

    // jsdom has no width, so the list behaves as on mobile
    fireEvent.click(text)

    expect(screen.getByText('Pour les jeunes et les enseignants')).toBeDefined()
  })
})
