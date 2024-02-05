import React from 'react'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'

import { theme } from '@/theme/theme'
import { Footer } from '@/ui/components/Footer'
import GlobalStyles from '@/ui/globalstyles'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Component {...pageProps} />
      <Footer />
    </ThemeProvider>
  )
}
