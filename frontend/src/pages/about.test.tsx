import React from 'react'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'

import About from './about'
import { render } from '@/tests'

describe('About page', () => {
  it('should pass axe accessibility tests', async () => {
    const { container } = render(<About />)

    expect(await axe(container)).toHaveNoViolations()
  })

  it('should render the page', () => {
    const { container } = render(<About />)

    expect(container).toMatchSnapshot()
  })

})
