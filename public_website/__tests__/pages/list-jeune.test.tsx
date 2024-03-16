import React from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { axe } from 'vitest-axe'

import { act, render } from '..'
// import { analyticsProvider } from '@/lib/analytics/analyticsProvider'
import ListeJeune, { getStaticProps } from '@/pages/liste-jeune'

vi.mock('@/lib/analytics/analyticsProvider')

// const mockLogEvent = analyticsProvider.logEvent

describe('List jeunes', () => {
  beforeEach(() => {
    process.env = {
      ...process.env,
      ID_TOKEN: 'dummy_token',
      BACKEND_API_URL: 'http://dummy_localhost:5001',
    }
  })

  it(
    'should pass accessibility tests',
    async () => {
      const { props } = await getStaticProps()
      const { container } = render(<ListeJeune {...props} />)

      let a11yResult
      await act(async () => {
        a11yResult = await axe(container)
      })
      expect(a11yResult).toHaveNoViolations()
    },
    { timeout: 20000 }
  )
})
