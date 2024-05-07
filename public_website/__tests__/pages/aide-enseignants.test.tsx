import React from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { axe } from 'vitest-axe'

import { act, render } from '..'
import TeachersHelp, { getStaticProps } from '@/pages/aide-enseignants'

vi.mock('@/lib/analytics/analyticsProvider')
describe('Help page - Teachers', () => {
  beforeEach(() => {
    process.env = {
      ...process.env,
      BACKEND_API_URL: 'http://dummy_localhost:5001',
    }
  })

  it(
    'should pass accessibility tests',
    async () => {
      const { props } = await getStaticProps()
      const { container } = render(<TeachersHelp {...props} />)

      let a11yResult
      await act(async () => {
        a11yResult = await axe(container)
      })
      expect(a11yResult).toHaveNoViolations()
    },
    { timeout: 50000 }
  )
})
