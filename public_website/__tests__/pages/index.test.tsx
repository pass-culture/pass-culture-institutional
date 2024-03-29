import React from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { axe } from 'vitest-axe'

import { act, fireEvent, render, screen } from '..'
import { analyticsProvider } from '@/lib/analytics/analyticsProvider'
import Home, { getStaticProps } from '@/pages'

vi.mock('@/lib/analytics/analyticsProvider')
const mockLogEvent = analyticsProvider.logEvent

describe('Home page', () => {
  beforeEach(() => {
    process.env = {
      ...process.env,
      ID_TOKEN: 'dummy_token',
      NEXT_PUBLIC_BACKEND_API_URL: 'http://dummy_localhost:5001',
    }
  })

  it(
    'should pass accessibility tests',
    async () => {
      const { props } = await getStaticProps()
      const { container } = render(<Home {...props} />)

      let a11yResult
      await act(async () => {
        a11yResult = await axe(container)
      })
      expect(a11yResult).toHaveNoViolations()
    },
    { timeout: 70000 }
  )

  it('should trigger test event when clicking on the button', async () => {
    const { props } = await getStaticProps()

    render(<Home {...props} />)

    const button = screen.getByText('Je m’inscris')
    fireEvent.click(button)

    expect(mockLogEvent).toHaveBeenCalledWith('goToSignup', {
      origin: 'Home',
    })
  })
})
