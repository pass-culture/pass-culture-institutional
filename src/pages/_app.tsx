import React from 'react'
import { theme } from '@/theme/theme'
import GlobalStyles from '@/ui/globalstyles'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Component {...pageProps} />
      </ThemeProvider>
    </React.Fragment>
  )
}
