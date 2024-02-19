import React from 'react'
import type { AppContext, AppProps } from 'next/app'
import App from 'next/app'
import { Montserrat } from 'next/font/google'
import { ThemeProvider } from 'styled-components'

import { theme } from '@/theme/theme'
import { Footer, FooterProps } from '@/ui/components/footer/Footer'
import { Header, HeaderProps } from '@/ui/components/header/Header'
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
      <Header {...headerData} />
      <main>
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
    '/header?populate[0]=TargetItems.MegaMenu.PrimaryListItems&populate[1]=TargetItems.MegaMenu.SecondaryListItems&populate[2]=TargetItems.MegaMenu.Cta&populate[3]=TargetItems.MegaMenu.CardLink&populate[4]=AboutItems.MegaMenu.PrimaryListItems&populate[5]=AboutItems.MegaMenu.SecondaryListItems&populate[6]=AboutItems.MegaMenu.Cta&populate[7]=AboutItems.MegaMenu.CardLink&populate[8]=Login.LoginItems&populate[9]=SignUp'
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
