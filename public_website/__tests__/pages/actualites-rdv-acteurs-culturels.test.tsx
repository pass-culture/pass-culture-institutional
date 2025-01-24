import React from 'react'
import { beforeEach, describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'

import { act, render } from '..'
import ListeActuCulturels, {
  getStaticProps,
} from '@/pages/actualites-rdv-acteurs-culturels'

describe('Actus rdv acteurs pass culture', () => {
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
      const { container } = render(<ListeActuCulturels {...props!} />)

      let a11yResult
      await act(async () => {
        a11yResult = await axe(container)
      })
      expect(a11yResult).toHaveNoViolations()
    },
    { timeout: 10000 }
  )
})
