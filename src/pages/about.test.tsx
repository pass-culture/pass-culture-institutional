import React from 'react'
import { axe } from 'vitest-axe'
import { describe, it, expect } from 'vitest'
import About from './about'
import { render } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
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
