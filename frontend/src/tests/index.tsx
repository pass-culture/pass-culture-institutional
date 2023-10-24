/* eslint-disable no-restricted-imports */
import React from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'

import { theme } from '@/theme/theme'

function customRender(
  ui: React.ReactElement<unknown>,
  options: RenderOptions = {}
) {
  const { wrapper: Wrapper = React.Fragment, ...restOfOptions } = options

  return render(ui, {
    wrapper: ({ children }) => (
      <ThemeProvider theme={theme}>
        <Wrapper>{children}</Wrapper>
      </ThemeProvider>
    ),
    ...restOfOptions,
  })
}

export * from '@testing-library/react'

export { customRender as render }
