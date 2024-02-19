import React from 'react'
import { describe, expect, it } from 'vitest'

import { headerDataFixtures } from '../fixtures'
import { fireEvent, render, screen } from '../index'
import { Header } from '@/ui/components/header/Header'

describe('header', () => {
  it('should open mega menu on main navigation item click', async () => {
    render(<Header {...headerDataFixtures} />)

    const button = screen.getByText('Target item 1')
    fireEvent.click(button)

    expect(screen.getByText('Mega menu 1')).toBeDefined()
  })

  it('should close mega menu on Escape keydown', async () => {
    render(<Header {...headerDataFixtures} />)

    const button = screen.getByText('Target item 1')
    fireEvent.click(button)

    fireEvent.keyDown(button, { key: 'Escape' })

    const megaMenuTitle = screen.queryByText('Mega menu 1')

    expect(megaMenuTitle).toBeNull()
  })

  it('should open login dropdown on login button click', async () => {
    render(<Header {...headerDataFixtures} />)

    const button = await screen.findByText('Login label')
    fireEvent.click(button)

    expect(screen.queryByText('😇')).toBeDefined()
  })

  // Tests for small viewport size
  it.todo('should open mobile menu on burger click')
  it.todo('should open sub panel on first mobile menu item click')
  it.todo('should open sub panel on mobile login item click')
})
