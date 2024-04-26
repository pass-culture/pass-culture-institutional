import React from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { axe } from 'vitest-axe'

import { act, render } from '..'
import CulturalActorsHelp, {
  getStaticProps,
} from '@/pages/aide-acteurs-culturels'

vi.mock('@/lib/analytics/analyticsProvider')
describe('Help page - Cultural actors', () => {
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
      const { container } = render(<CulturalActorsHelp {...props} />)

      let a11yResult
      await act(async () => {
        a11yResult = await axe(container)
      })
      expect(a11yResult).toHaveNoViolations()
    },
    { timeout: 10000 }
  )
})
