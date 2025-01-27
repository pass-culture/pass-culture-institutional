import React from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { axe } from 'vitest-axe'

import { act, render } from '..'
import Help, { getStaticProps } from '@/pages/aide-jeunes-parents'

vi.mock('@/lib/analytics/analyticsProvider')
describe('Help page - Young & adults', () => {
  beforeEach(() => {
    process.env = {
      ...process.env,
      BACKEND_API_URL: 'http://dummy_localhost:5001',
    }
  })

  it('should pass accessibility tests', { timeout: 10000 }, async () => {
    const { props } = await getStaticProps()
    const { container } = render(<Help {...props!} />)

    let a11yResult
    await act(async () => {
      a11yResult = await axe(container)
    })
    expect(a11yResult).toHaveNoViolations()
  })
})
