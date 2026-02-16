import React, { useEffect, useMemo } from 'react'
import { Montserrat } from 'next/font/google'
import { ThemeProvider } from 'styled-components'

import { useAxeptio } from '@/hooks/useAxeptio'
import { useConsent } from '@/hooks/useConsent'
import { useTolkai } from '@/hooks/useTolkai'
import { analyticsProvider } from '@/lib/analytics/analyticsProvider'
import { theme } from '@/theme/theme'
import type { MyAppProps } from '@/types/props'
import { BreadcrumbContext } from '@/ui/components/breadcrumb/breadcrumb-context'
import { Footer } from '@/ui/components/footer/Footer'
import { Header } from '@/ui/components/header/Header'
import { SkipLink } from '@/ui/components/skipLink/SkipLink'
import GlobalStyles from '@/ui/globalstyles'

const montSerrat = Montserrat({ subsets: ['latin'] })
const isProd = process.env.NODE_ENV === 'production'

export default function MyApp({ Component, pageProps }: MyAppProps) {
  useAxeptio()
  useTolkai()
  const acceptedVendors = useConsent()
  const hasAcceptedFirebase = acceptedVendors['firebase']

  useEffect(() => {
    if (isProd && hasAcceptedFirebase) analyticsProvider.init()
  }, [hasAcceptedFirebase])

  const path =
    typeof window !== 'undefined' ? window.location?.pathname : undefined
  useEffect(() => {
    if (isProd && path && hasAcceptedFirebase) {
      analyticsProvider.logEvent('pageView', {
        origin: path,
      })
    }
  }, [hasAcceptedFirebase, path])

  const breadcrumbContextValue = useMemo(
    () => ({
      targetItems: pageProps.headerData.targetItems,
      aboutItems: pageProps.headerData.aboutItems,
      footerItems: pageProps.footerData.LegalLinks,
    }),
    [
      pageProps.headerData.targetItems,
      pageProps.headerData.aboutItems,
      pageProps.footerData.LegalLinks,
    ]
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
          targetItems={pageProps.headerData.targetItems}
          aboutItems={pageProps.headerData.aboutItems}
          login={pageProps.headerData.login}
          signup={pageProps.headerData.signup}
        />
        <main id="main-content">
          <Component {...pageProps} />
        </main>
        <Footer {...pageProps.footerData} />
      </BreadcrumbContext.Provider>
    </ThemeProvider>
  )
}
