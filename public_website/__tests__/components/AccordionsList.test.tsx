import React from 'react'
import { userEvent } from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import '@testing-library/jest-dom'
import { accordionsListFixtures } from '../fixtures/accordionsListFixtures'
import { render, screen } from '../index'
import AccordionsList from '@/lib/blocks/AccordionsList'

describe('AccordionsList', () => {
  it('should render accordions list', async () => {
    render(<AccordionsList {...accordionsListFixtures} />)

    expect(
      screen.getByText('C’est quoi une “Charte des données personnelles” ?')
    ).toBeDefined()
    expect(screen.getByText('Pourquoi cette charte ?')).toBeDefined()
    expect(screen.getByText('Qui sommes-nous ?')).toBeDefined()
  })

  it('should render simple text', async () => {
    render(<AccordionsList {...accordionsListFixtures} />)

    const elements = screen.getAllByText(/pass Culture/)
    expect(
      elements.some((el) =>
        el.textContent?.includes('Lors de ton utilisation des services')
      )
    ).toBe(true)
  })

  it('should toggle accordion content when clicked', async () => {
    const user = userEvent.setup()
    render(<AccordionsList {...accordionsListFixtures} />)

    const accordionSummary = screen.getByText(
      'C’est quoi une “Charte des données personnelles” ?'
    )

    expect(
      screen.queryByText(/Lors de ton utilisation des services/)
    ).not.toBeVisible()

    // Ouvrir l'accordéon
    await user.click(accordionSummary)
    expect(
      screen.getByText(/Lors de ton utilisation des services/)
    ).toBeVisible()

    // Fermer l'accordéon
    await user.click(accordionSummary)
    expect(
      screen.queryByText(/Lors de ton utilisation des services/)
    ).not.toBeVisible()
  })
})
