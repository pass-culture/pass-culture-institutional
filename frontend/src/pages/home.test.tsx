import React from 'react'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'

import Home from './index'
import { fireEvent, render, screen } from '@/tests'

describe('Home page', () => {
  it('should pass axe accessibility tests', async () => {
    const { container } = render(<Home />)

    expect(await axe(container)).toHaveNoViolations()
  })

  it('should render the page', () => {
    const { container } = render(<Home />)

    expect(container).toMatchSnapshot()
  })

  it('should select the checkbox when clicking on its label', () => {
    render(<Home />)

    const checkbox = screen.getByRole('checkbox')
    const label = screen.getByText('Checkbox à cocher')

    fireEvent.click(label)

    expect(checkbox).toHaveProperty('checked', true)
  })
})
