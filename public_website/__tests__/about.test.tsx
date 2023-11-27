import React from 'react'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'

import About from '../src/pages/about'
import { act, render, screen, waitFor } from '.'

describe('About page', () => {
  it('should pass axe accessibility tests', async () => {
    const { container } = render(<About />)

    await waitFor(() => {
      expect(screen.queryByText('Chargement...')).toBeFalsy()
    })

    let a11yResult
    await act(async () => {
      a11yResult = await axe(container)
    })

    expect(a11yResult).toHaveNoViolations()
  })

  it('should render the page', async () => {
    const { container } = render(<About />)

    await waitFor(() => {
      expect(screen.queryByText('Chargement...')).toBeFalsy()
    })

    expect(container).toMatchSnapshot()
  })
})
