import React from 'react'
import type { AppContext, AppProps } from 'next/app'
import App from 'next/app'
import { Montserrat } from 'next/font/google'
import { ThemeProvider } from 'styled-components'

import { theme } from '@/theme/theme'
import { Footer, FooterProps } from '@/ui/components/footer/Footer'
import { Header } from '@/ui/components/Header/Header'
import GlobalStyles from '@/ui/globalstyles'
import { fetchCMS } from '@/utils/fetchCMS'

const montSerrat = Montserrat({ subsets: ['latin'] })

type MyAppProps = AppProps & { footerData: FooterProps }

export default function MyApp({
  Component,
  pageProps,
  footerData,
}: MyAppProps) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {/* eslint-disable-next-line react/no-unknown-property */}
      <style jsx global>{`
        // NOSONAR(typescript:S6747) exceptionally allow global JSX attributes for global font import
        html {
          font-family: ${montSerrat.style.fontFamily} !important;
        }
      `}</style>
      <Header />
      <main>
        <Component {...pageProps} />
      </main>
      <Footer {...footerData} />
    </ThemeProvider>
  )
}

type FooterData = {
  id: number
  attributes: FooterProps
}

MyApp.getInitialProps = async (context: AppContext) => {
  const footerData = await fetchCMS<FooterData>(
    '/footer?populate[0]=Lists&populate[1]=Lists.Links&populate[2]=LegalLinks'
  )
  const ctx = await App.getInitialProps(context)

  return { ...ctx, footerData: footerData.data.attributes }
}
