import React from 'react'
import { describe, expect, it } from 'vitest'

import { render, screen } from '../index'
import { LinkIcon } from '@/ui/components/link-icon/LinkIcon'

describe('LinkIcon', () => {
  it('should display an arrow for internal links', () => {
    render(<LinkIcon url="/notre-mission" />)

    expect(screen.getByTestId('internal-link-icon')).toBeDefined()
    expect(screen.queryByText('(nouvel onglet)')).toBeNull()
  })

  it('should display an external icon and a screen reader hint for external links', () => {
    render(<LinkIcon url="https://pass.culture.fr" />)

    expect(screen.getByTestId('external-link-icon')).toBeDefined()
    expect(screen.getByText('(nouvel onglet)')).toBeDefined()
  })
})
