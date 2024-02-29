import React from 'react'
import type { AppContext, AppProps } from 'next/app'
import App from 'next/app'
import { Montserrat } from 'next/font/google'
import { ThemeProvider } from 'styled-components'

import { theme } from '@/theme/theme'
import { Footer, FooterProps } from '@/ui/components/footer/Footer'
import { Header, HeaderProps } from '@/ui/components/header/Header'
import { SkipLink } from '@/ui/components/skipLink/SkipLink'
import GlobalStyles from '@/ui/globalstyles'
import { fetchCMS } from '@/utils/fetchCMS'

const montSerrat = Montserrat({ subsets: ['latin'] })

type MyAppProps = AppProps & {
  headerData: HeaderProps
  footerData: FooterProps
}

export default function MyApp({
  Component,
  pageProps,
  headerData,
  footerData,
}: MyAppProps) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {/* eslint-disable-next-line react/no-unknown-property */}
      <style jsx global>{`
        html {
          font-family: ${montSerrat.style.fontFamily} !important;
        }
      `}</style>
      <SkipLink label="Aller au contenu principal" href="#main-content" />
      <SkipLink label="Aller au pied de page" href="#footer" />
      <Header {...headerData} />
      <main id="main-content">
        <Component {...pageProps} />
      </main>
      <Footer {...footerData} />
    </ThemeProvider>
  )
}

type HeaderData = {
  id: number
  attributes: HeaderProps
}

type FooterData = {
  id: number
  attributes: FooterProps
}

MyApp.getInitialProps = async (context: AppContext) => {
  const headerData = await fetchCMS<HeaderData>(
    '/header?populate[0]=targetItems.megaMenu.primaryListItems&populate[1]=targetItems.megaMenu.secondaryListItems&populate[2]=targetItems.megaMenu.cta&populate[3]=targetItems.megaMenu.cardLink&populate[4]=aboutItems.megaMenu.primaryListItems&populate[5]=aboutItems.megaMenu.secondaryListItems&populate[6]=aboutItems.megaMenu.cta&populate[7]=aboutItems.megaMenu.cardLink&populate[8]=login.loginItems&populate[9]=signUp'
  )
  const footerData = await fetchCMS<FooterData>(
    '/footer?populate[0]=Lists&populate[1]=Lists.Links&populate[2]=LegalLinks'
  )
  const ctx = await App.getInitialProps(context)

  return {
    ...ctx,
    headerData: headerData.data.attributes,
    footerData: footerData.data.attributes,
  }
}
