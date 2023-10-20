import React from 'react'
import { render } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'

import Home from './index'
import { theme } from '@/theme/theme'

describe('Home page', () => {
  it('should pass axe accessibility tests', async () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <Home />
      </ThemeProvider>
    )

    expect(await axe(container)).toHaveNoViolations()
  })
})
