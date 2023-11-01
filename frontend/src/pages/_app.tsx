import React, { useEffect } from 'react'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'

import { analyticsProvider } from '@/libs/analytics/analyticsProvider'
import { theme } from '@/theme/theme'
import GlobalStyles from '@/ui/globalstyles'

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    analyticsProvider.init()
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
