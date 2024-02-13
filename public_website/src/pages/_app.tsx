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
        // NOSONAR(typescript:S6747) exceptionally allow global JSX attributes for global font import
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

// type HeaderData = {
//   id: number
//   attributes: HeaderProps
// }

type FooterData = {
  id: number
  attributes: FooterProps
}

MyApp.getInitialProps = async (context: AppContext) => {
  const footerData = await fetchCMS<FooterData>(
    '/footer?populate[0]=Lists&populate[1]=Lists.Links&populate[2]=LegalLinks'
  )
  const ctx = await App.getInitialProps(context)

  // TODO: fetch data from Strapi
  const headerData = {
    data: {
      attributes: {
        TargetItems: [
          {
            Label: 'Jeunes et parents',
            MegaMenu: {
              Title: 'Faites découvrir vos offres culturelles aux jeunes',
              Cta: { Label: 'S’inscrire en tant qu’acteur culturel', URL: '#' },
              PrimaryListItems: [
                { Label: 'L’essentiel du pass Culture', URL: '#' },
                { Label: 'Comment proposer des offres ?', URL: '#' },
                { Label: 'Le programme Ambassadeurs', URL: '#' },
                { Label: 'Actualités et prochains rendez-vous', URL: '#' },
              ],
              SecondaryListItems: [{ Label: 'Aide et support', URL: '#' }],
              CardTitle: 'Webinaire',
              CardDescription:
                'Participez au prochain webinaire à destination des acteurs culturels',
              CardLink: { Label: 'S’inscrire', URL: '#' },
            },
          },
          {
            Label: 'Acteurs culturels',
            MegaMenu: {
              Title: 'Faites découvrir vos offres culturelles aux jeunes',
              Cta: { Label: 'S’inscrire en tant qu’acteur culturel', URL: '#' },
              PrimaryListItems: [
                { Label: 'L’essentiel du pass Culture', URL: '#' },
                { Label: 'Comment proposer des offres ?', URL: '#' },
                { Label: 'Le programme Ambassadeurs', URL: '#' },
                { Label: 'Actualités et prochains rendez-vous', URL: '#' },
              ],
              SecondaryListItems: [{ Label: 'Aide et support', URL: '#' }],
              CardTitle: 'Webinaire',
              CardDescription:
                'Participez au prochain webinaire à destination des acteurs culturels',
              CardLink: { Label: 'S’inscrire', URL: '#' },
            },
          },
          {
            Label: 'Enseignants',
            MegaMenu: {
              Title: 'Faites découvrir vos offres culturelles aux jeunes',
              Cta: { Label: 'S’inscrire en tant qu’acteur culturel', URL: '#' },
              PrimaryListItems: [
                { Label: 'L’essentiel du pass Culture', URL: '#' },
                { Label: 'Comment proposer des offres ?', URL: '#' },
                { Label: 'Le programme Ambassadeurs', URL: '#' },
                { Label: 'Actualités et prochains rendez-vous', URL: '#' },
              ],
              SecondaryListItems: [{ Label: 'Aide et support', URL: '#' }],
              CardTitle: 'Webinaire',
              CardDescription:
                'Participez au prochain webinaire à destination des acteurs culturels',
              CardLink: { Label: 'S’inscrire', URL: '#' },
            },
          },
          {
            Label: 'Partenaires',
            MegaMenu: {
              Title: 'Faites découvrir vos offres culturelles aux jeunes',
              Cta: { Label: 'S’inscrire en tant qu’acteur culturel', URL: '#' },
              PrimaryListItems: [
                { Label: 'L’essentiel du pass Culture', URL: '#' },
                { Label: 'Comment proposer des offres ?', URL: '#' },
                { Label: 'Le programme Ambassadeurs', URL: '#' },
                { Label: 'Actualités et prochains rendez-vous', URL: '#' },
              ],
              SecondaryListItems: [{ Label: 'Aide et support', URL: '#' }],
              CardTitle: 'Webinaire',
              CardDescription:
                'Participez au prochain webinaire à destination des acteurs culturels',
              CardLink: { Label: 'S’inscrire', URL: '#' },
            },
          },
        ],
        AboutItems: [
          {
            Label: 'Nous connaître',
            MegaMenu: {
              Title: 'Faites découvrir vos offres culturelles aux jeunes',
              Cta: { Label: 'S’inscrire en tant qu’acteur culturel', URL: '#' },
              PrimaryListItems: [
                { Label: 'L’essentiel du pass Culture', URL: '#' },
                { Label: 'Comment proposer des offres ?', URL: '#' },
                { Label: 'Le programme Ambassadeurs', URL: '#' },
                { Label: 'Actualités et prochains rendez-vous', URL: '#' },
              ],
              SecondaryListItems: [{ Label: 'Aide et support', URL: '#' }],
              CardTitle: 'Webinaire',
              CardDescription:
                'Participez au prochain webinaire à destination des acteurs culturels',
              CardLink: { Label: 'S’inscrire', URL: '#' },
            },
          },
          {
            Label: 'Newsroom',
            MegaMenu: {
              Title: 'Faites découvrir vos offres culturelles aux jeunes',
              Cta: { Label: 'S’inscrire en tant qu’acteur culturel', URL: '#' },
              PrimaryListItems: [
                { Label: 'L’essentiel du pass Culture', URL: '#' },
                { Label: 'Comment proposer des offres ?', URL: '#' },
                { Label: 'Le programme Ambassadeurs', URL: '#' },
                { Label: 'Actualités et prochains rendez-vous', URL: '#' },
              ],
              SecondaryListItems: [{ Label: 'Aide et support', URL: '#' }],
              CardTitle: 'Webinaire',
              CardDescription:
                'Participez au prochain webinaire à destination des acteurs culturels',
              CardLink: { Label: 'S’inscrire', URL: '#' },
            },
          },
        ],
        Login: {
          ButtonLabel: 'Connexion',
          Items: [
            {
              Label: 'Je suis un jeune entre 15 et 18 ans',
              URL: '#',
              Color: '#94008C',
              Emoji: '👩‍🎓',
            },
            {
              Label: 'Je suis un acteur du secteur culturel',
              URL: '#',
              Color: '#36106A',
              Emoji: '🎭',
            },
          ],
        },
        SignUp: { Label: 'Inscription', URL: '#' },
      },
    },
  }

  return {
    ...ctx,
    headerData: headerData.data.attributes,
    footerData: footerData.data.attributes,
  }
}
