import React from 'react'
import { render } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'

import About from './about'
import { theme } from '@/theme/theme'

describe('About page', () => {
  it('should pass axe accessibility tests', async () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <About />
      </ThemeProvider>
    )

    expect(await axe(container)).toHaveNoViolations()
  })
})
