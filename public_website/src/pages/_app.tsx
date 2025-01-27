import React, { useEffect, useMemo } from 'react'
import App, { AppContext } from 'next/app'
import { Montserrat } from 'next/font/google'
import { ThemeProvider } from 'styled-components'

import {
  AppDocument,
  AppQuery,
  FooterFragment,
  HeaderFragment,
} from '@/generated/graphql'
import { useAxeptio } from '@/hooks/useAxeptio'
import { useConsent } from '@/hooks/useConsent'
import { analyticsProvider } from '@/lib/analytics/analyticsProvider'
import urqlClient from '@/lib/urqlClient'
import { theme } from '@/theme/theme'
import { BreadcrumbContext } from '@/ui/components/breadcrumb/breadcrumb-context'
import { Footer } from '@/ui/components/footer/Footer'
import { Header } from '@/ui/components/header/Header'
import { SkipLink } from '@/ui/components/skipLink/SkipLink'
import GlobalStyles from '@/ui/globalstyles'

const montSerrat = Montserrat({ subsets: ['latin'] })

type MyAppProps = {
  Component: React.ComponentType
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pageProps: any
  headerData: HeaderFragment
  footerData: FooterFragment
}

export default function MyApp({
  Component,
  pageProps,
  headerData,
  footerData,
}: MyAppProps) {
  useAxeptio()
  const acceptedVendors = useConsent()
  const hasAcceptedFirebase = acceptedVendors['firebase']

  useEffect(() => {
    if (hasAcceptedFirebase) analyticsProvider.init()
  }, [hasAcceptedFirebase])

  const path =
    typeof window !== 'undefined' ? window.location?.pathname : undefined
  useEffect(() => {
    if (path && hasAcceptedFirebase) {
      analyticsProvider.logEvent('pageView', {
        origin: path,
      })
    }
  }, [hasAcceptedFirebase, path])

  const breadcrumbContextValue = useMemo(
    () => ({
      targetItems: headerData.targetItems.filter((item) => item !== null) ?? [],
      aboutItems: headerData.aboutItems.filter((item) => item !== null) ?? [],
      footerItems: footerData.LegalLinks?.filter((item) => item !== null) ?? [],
    }),
    [headerData.targetItems, headerData.aboutItems, footerData.LegalLinks]
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
        <main id="main-content">
          <Component {...pageProps} />
        </main>
        <Footer {...footerData} />
      </BreadcrumbContext.Provider>
    </ThemeProvider>
  )
}

MyApp.getInitialProps = async (context: AppContext) => {
  const result = await urqlClient.query<AppQuery>(AppDocument, {}).toPromise()

  if (
    result.error ||
    !result.data ||
    !result.data.header ||
    !result.data.footer
  ) {
    console.error('GraphQL Error:', result.error?.message ?? 'No data')
    return { notFound: true }
  }

  const ctx = await App.getInitialProps(context)

  return {
    ...ctx,
    headerData: result.data.header,
    footerData: result.data.footer,
  }
}
