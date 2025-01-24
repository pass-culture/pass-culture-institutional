import React from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { axe } from 'vitest-axe'

import { act, fireEvent, render, screen, waitFor } from '..'
import { analyticsProvider } from '@/lib/analytics/analyticsProvider'
import Home, { getStaticProps } from '@/pages'

vi.mock('@/lib/analytics/analyticsProvider')
const mockLogEvent = analyticsProvider.logEvent

describe('Home page', () => {
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
      const { container } = render(<Home {...props!} />)

      let a11yResult
      await act(async () => {
        a11yResult = await axe(container)
      })
      expect(a11yResult).toHaveNoViolations()
    },
    { timeout: 30000 }
  )

  describe('when eventName is defined in the cta and exists in EventMap', () => {
    it('should trigger event when clicking on the button', async () => {
      const { props } = await getStaticProps()

      render(<Home {...props!} />)

      const button = screen.getByText('Je m’inscris')
      fireEvent.click(button)
      waitFor(() => {
        expect(mockLogEvent).toHaveBeenCalledWith('testEvent', {
          origin: 'test',
        })
      })
    })
  })

  describe("when eventName is undefined in the cta or doesn't exist in EventMap", () => {
    it('should not trigger any event when clicking on the button', async () => {
      vi.resetAllMocks()
      const { props } = await getStaticProps()

      render(<Home {...props!} />)

      const button = screen.getByText('Je m’inscris')
      fireEvent.click(button)

      expect(mockLogEvent).not.toHaveBeenCalled()
    })
  })
})
