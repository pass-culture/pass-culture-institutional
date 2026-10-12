import React from 'react'
import { describe, expect, it } from 'vitest'

import { render, screen } from '../index'
import { IconLinksList } from '@/lib/blocks/IconLinksList'

const items = [
  {
    id: 1,
    emoji: '🎟️',
    title: 'Événements live',
    description: 'Concerts, spectacles, festivals…',
    url: '/les-offres-et-experiences',
  },
  {
    id: 2,
    emoji: '🖥️',
    title: 'Services numériques',
    description: 'ebooks, abonnements…',
    url: 'https://pass.culture.fr',
  },
  {
    id: 3,
    emoji: '📙',
    title: 'Biens culturels',
    description: null,
    url: null,
  },
]

describe('IconLinksList', () => {
  it('should display the title and every item', () => {
    render(
      <IconLinksList title="Le pass Culture donne accès à" items={items} />
    )

    expect(screen.getByText('Le pass Culture donne accès à')).toBeDefined()
    expect(screen.getByText('Événements live')).toBeDefined()
    expect(screen.getByText('Concerts, spectacles, festivals…')).toBeDefined()
    expect(screen.getByText('Biens culturels')).toBeDefined()
  })

  it('should only link the items that have a URL', () => {
    render(<IconLinksList items={items} />)

    const links = screen.getAllByRole('link')
    expect(links.map((link) => link.getAttribute('href'))).toEqual([
      '/les-offres-et-experiences',
      'https://pass.culture.fr',
    ])
    expect(links[1]?.getAttribute('target')).toBe('_blank')
  })

  it('should choose the icon from the URL', () => {
    render(<IconLinksList items={items} />)

    expect(screen.getAllByTestId('internal-link-icon')).toHaveLength(1)
    expect(screen.getAllByTestId('external-link-icon')).toHaveLength(1)
  })
})
