import React from 'react'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'

import Home from './index'
import { render } from '@/tests'

describe('Home page', () => {
  it('should pass axe accessibility tests', async () => {
    const { container } = render(<Home />)

    expect(await axe(container)).toHaveNoViolations()
  })
})
