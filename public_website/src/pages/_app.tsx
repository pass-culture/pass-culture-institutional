import React from 'react'
import type { AppProps } from 'next/app'
import { Montserrat } from 'next/font/google'
import { ThemeProvider } from 'styled-components'

import { theme } from '@/theme/theme'
import { Footer } from '@/ui/components/Footer'
import GlobalStyles from '@/ui/globalstyles'

const montSerrat = Montserrat({ subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {/* Import font globally */}
      {/* eslint-disable-next-line react/no-unknown-property */}
      <style jsx global>{`
        html {
          font-family: ${montSerrat.style.fontFamily} !important;
        }
      `}</style>
      <main>
        <Component {...pageProps} />
      </main>
      <Footer />
    </ThemeProvider>
  )
}
