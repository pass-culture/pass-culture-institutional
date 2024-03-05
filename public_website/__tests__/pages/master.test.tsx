import React from 'react'
import { beforeEach, describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'

import { act, render } from '..'
import Master, { getStaticProps } from '@/pages'

describe('Master page', () => {
  beforeEach(() => {
    process.env = {
      ...process.env,
      ID_TOKEN: 'dummy_token',
      BACKEND_API_URL: 'http://dummy_localhost:5001',
    }
  })

  it('should pass accessibility tests', async () => {
    const { props } = await getStaticProps()
    const { container } = render(<Master {...props} />)

    let a11yResult
    await act(async () => {
      a11yResult = await axe(container)
    })
    expect(a11yResult).toHaveNoViolations()
  })
})
