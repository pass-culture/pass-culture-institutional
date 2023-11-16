import React from 'react'
import { describe, expect, it, vi } from 'vitest'
import { axe } from 'vitest-axe'

import Home from './index'
import { analyticsProvider } from '@/libs/analytics/analyticsProvider'
import { act, fireEvent, render, screen } from '@/tests'

vi.mock('@/libs/analytics/analyticsProvider')
const mockLogEvent = analyticsProvider.logEvent

describe('Home page', () => {
  it('should pass axe accessibility tests', async () => {
    const { container } = render(<Home />)

    let a11yResult
    await act(async () => {
      a11yResult = await axe(container)
    })
    expect(a11yResult).toHaveNoViolations()
  })

  it('should render the page', () => {
    const { container } = render(<Home />)

    expect(container).toMatchSnapshot()
  })

  it('should select the checkbox when clicking on its label', () => {
    render(<Home />)

    const checkbox = screen.getByTestId('checkbox-acceptTerms')
    const label = screen.getByText('Checkbox à cocher')

    fireEvent.click(label)

    expect(checkbox).toHaveProperty('checked', true)
  })

  it('should trigger test event when clicking on the button', () => {
    render(<Home />)

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(mockLogEvent).toHaveBeenCalledWith('testEvent', {
      param: 'testParam',
    })
  })
})
