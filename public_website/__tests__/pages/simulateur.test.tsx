import React from 'react'
import { beforeEach, describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'

import { act, fireEvent, render, screen } from '..'
import SimulatorPage, { getStaticProps } from '@/pages/simulateur'

describe('Simulator page', () => {
  beforeEach(() => {
    process.env = {
      ...process.env,
      NEXT_PUBLIC_BACKEND_API_URL: 'http://dummy_localhost:5001',
    }
  })

  it(
    'should pass accessibility tests',
    async () => {
      const { props } = await getStaticProps()
      const { container } = render(<SimulatorPage {...props} />)

      let a11yResult
      await act(async () => {
        a11yResult = await axe(container)
      })
      expect(a11yResult).toHaveNoViolations()
    },
    { timeout: 10000 }
  )

  it('should show the success screen if user is 16, not french, in france for more than a year', async () => {
    const { props } = await getStaticProps()
    render(<SimulatorPage {...props} />)

    // Selct 16 years old and click "Next"
    fireEvent.click(screen.getAllByText('16 ans')[0]!)
    fireEvent.click(screen.getByText('Suivant'))

    // Select "Other nationality" and click "Next"
    await screen.findByText('Quelle est ta nationalité ?')
    fireEvent.click(screen.getByText('Autre nationalité'))
    fireEvent.click(screen.getByText('Suivant'))

    // Select "Since more than a year" and click "Next"
    await screen.findByText('Depuis combien de temps résides-tu en France ?')
    fireEvent.click(screen.getByText('Depuis plus d’une année'))
    fireEvent.click(screen.getByText('Suivant'))

    // Click "Next"
    await screen.findByText('30 €')
    fireEvent.click(screen.getByText('Suivant'))

    // The result screen should appear
    expect(
      await screen.findByText(
        'C’est noté ! Voici maintenant les étapes à suivre'
      )
    ).toBeTruthy()
  })

  it('should show the failure screen if user is younger than 15 yo', async () => {
    const { props } = await getStaticProps()
    render(<SimulatorPage {...props} />)

    // Selct 15 years old and click "Next"
    fireEvent.click(screen.getAllByText('-15 ans')[0]!)
    fireEvent.click(screen.getByText('Suivant'))

    // The failure screen should appear
    expect(await screen.findByText('Un peu de patience...')).toBeTruthy()
  })

  it('should show the failure screen if user is older than 18 yo', async () => {
    const { props } = await getStaticProps()
    render(<SimulatorPage {...props} />)

    // Selct 15 years old and click "Next"
    fireEvent.click(screen.getAllByText('+18 ans')[0]!)
    fireEvent.click(screen.getByText('Suivant'))

    // The failure screen should appear
    expect(
      await screen.findByText('Trop tard, tu n’es plus éligible')
    ).toBeTruthy()
  })
})
