import React from 'react'
import { beforeEach, describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'

import { act, render } from '..'
import NotFound, { getStaticProps } from '@/pages/404'
describe('404', () => {
  beforeEach(() => {
    process.env = {
      ...process.env,
      NEXT_PUBLIC_BACKEND_API_URL: 'http://dummy_localhost:5001',
    }
  })

  it('should pass accessibility tests', { timeout: 10000 }, async () => {
    const { props } = await getStaticProps()
    const { container } = render(<NotFound {...props!} />)

    let a11yResult
    await act(async () => {
      a11yResult = await axe(container)
    })
    expect(a11yResult).toHaveNoViolations()
  })
})
