import React from 'react'
import { beforeEach, describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'

import { act, render } from '..'
import ListeOffre, { getStaticProps } from '@/pages/liste-offres'

describe('Liste offres', () => {
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
      const { container } = render(<ListeOffre {...props} />)

      let a11yResult
      await act(async () => {
        a11yResult = await axe(container)
      })
      expect(a11yResult).toHaveNoViolations()
    },
    { timeout: 20000 }
  )
})
