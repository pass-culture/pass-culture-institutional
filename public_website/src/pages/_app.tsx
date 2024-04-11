import React, { useMemo } from 'react'
import type { AppContext, AppProps } from 'next/app'
import App from 'next/app'
import { Montserrat } from 'next/font/google'
import { stringify } from 'qs'
import styled, { ThemeProvider } from 'styled-components'

import { theme } from '@/theme/theme'
import { APIResponseData } from '@/types/strapi'
import { BreadcrumbContext } from '@/ui/components/breadcrumb/breadcrumb-context'
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
  const breadcrumbContextValue = useMemo(
    () => ({
      targetItems: headerData.targetItems,
      aboutItems: headerData.aboutItems,
    }),
    [headerData.targetItems, headerData.aboutItems]
  )

  return (
    <ThemeProvider theme={theme}>
      <BreadcrumbContext.Provider value={breadcrumbContextValue}>
        <GlobalStyles />
        {/* eslint-disable-next-line react/no-unknown-property */}
        <style jsx global>{`
          html {
            font-family: ${montSerrat.style.fontFamily} !important;
          }
        `}</style>
        <SkipLink label="Aller au contenu principal" href="#main-content" />
        <SkipLink label="Aller au pied de page" href="#footer" />
        <Header
          targetItems={headerData.targetItems}
          aboutItems={headerData.aboutItems}
          login={headerData.login}
          signup={headerData.signup}
        />
        <Main id="main-content">
          <Component {...pageProps} />
        </Main>
        <Footer {...footerData} />
      </BreadcrumbContext.Provider>
    </ThemeProvider>
  )
}

type FooterData = {
  id: number
  attributes: FooterProps
}

MyApp.getInitialProps = async (context: AppContext) => {
  // Fetch header data
  const headerQuery = stringify({
    populate: [
      'targetItems.megaMenu',
      'targetItems.megaMenu.primaryListItems',
      'targetItems.megaMenu.secondaryListItems',
      'targetItems.megaMenu.cta',
      'targetItems.megaMenu.cardLink',
      'aboutItems.megaMenu',
      'aboutItems.megaMenu.primaryListItems',
      'aboutItems.megaMenu.secondaryListItems',
      'aboutItems.megaMenu.cta',
      'aboutItems.megaMenu.cardLink',
      'login',
      'login.items',
      'signup',
      'signup.items',
    ],
  })
  const headerData = await fetchCMS<APIResponseData<'api::header.header'>>(
    `/header?${headerQuery}`
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

const Main = styled.main`
  /* display: flex;
  flex-direction: column;
  align-items: normal;

  & > * {
    width: 100%;
  } */
`
