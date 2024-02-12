import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'

import logoGouvernement from '../../../../public/images/logo-gouvernement.svg'
import logoPassCulture from '../../../../public/images/logo-pass-culture.svg'
import { FooterList } from './FooterList'
import { FooterMobileList } from './FooterMobileList'
import { useIsAndroid } from '@/hooks/useIsAndroid'

// TODO: use content from Strapi
const FooterListContent = [
  {
    title: 'Jeunes',
    listItems: [
      { label: 'Le pass Culture, c’est quoi ?', href: '#' },
      {
        label: 'Le pass Culture, c’est quoi ? bla bla bla bla bla bla',
        href: '#',
      },
      { label: 'Le pass Culture, c’est quoi ?', href: '#' },
      { label: 'Le pass Culture, c’est quoi ?', href: '#' },
    ],
  },
  {
    title: 'Acteurs culturels',
    listItems: [
      { label: 'Le pass Culture, c’est quoi ?', href: '#' },
      { label: 'Le pass Culture, c’est quoi ?', href: '#' },
      { label: 'Le pass Culture, c’est quoi ?', href: '#' },
      { label: 'Le pass Culture, c’est quoi ?', href: '#' },
      { label: 'Le pass Culture, c’est quoi ?', href: '#' },
      { label: 'Le pass Culture, c’est quoi ?', href: '#' },
    ],
  },
  {
    title: 'Enseignants',
    listItems: [
      { label: 'Le pass Culture, c’est quoi ?', href: '#' },
      { label: 'Le pass Culture, c’est quoi ?', href: '#' },
      { label: 'Le pass Culture, c’est quoi ?', href: '#' },
      { label: 'Le pass Culture, c’est quoi ?', href: '#' },
    ],
  },
  {
    title: 'Enseignants',
    listItems: [
      { label: 'Le pass Culture, c’est quoi ?', href: '#' },
      { label: 'Le pass Culture, c’est quoi ?', href: '#' },
      { label: 'Le pass Culture, c’est quoi ?', href: '#' },
      { label: 'Le pass Culture, c’est quoi ?', href: '#' },
      { label: 'Le pass Culture, c’est quoi ?', href: '#' },
      { label: 'Le pass Culture, c’est quoi ?', href: '#' },
      { label: 'Le pass Culture, c’est quoi ?', href: '#' },
      { label: 'Le pass Culture, c’est quoi ?', href: '#' },
    ],
  },
  {
    title: 'Enseignants',
    listItems: [
      { label: 'Le pass Culture, c’est quoi ?', href: '#' },
      { label: 'Le pass Culture, c’est quoi ?', href: '#' },
      { label: 'Le pass Culture, c’est quoi ?', href: '#' },
      { label: 'Le pass Culture, c’est quoi ?', href: '#' },
    ],
  },
  {
    title: 'Enseignants',
    listItems: [
      { label: 'Le pass Culture, c’est quoi ?', href: '#' },
      { label: 'Le pass Culture, c’est quoi ?', href: '#' },
      { label: 'Le pass Culture, c’est quoi ?', href: '#' },
      { label: 'Le pass Culture, c’est quoi ?', href: '#' },
    ],
  },
]

const LegalLinks = [
  { label: 'Accessibilité', href: '#' },
  { label: 'Services Publics +', href: '#' },
  { label: 'Informations légales', href: '#' },
  { label: 'Plan du site', href: '#' },
]

const appStoreUrl = 'https://apps.apple.com/fr/app/pass-culture/id1557887412'
const playStoreUrl =
  'https://play.google.com/store/apps/details?id=app.passculture.webapp&hl=fr&gl=US'

export function Footer() {
  const isAndroid = useIsAndroid()
  const storeUrl = isAndroid ? playStoreUrl : appStoreUrl

  return (
    <StyledFooter>
      <StyledContentContainer>
        <StyledTopSection>
          <StyledLogos>
            {/* TODO: get real svg files */}
            <Link href="https://pass.culture.fr/">
              <Image src={logoPassCulture} alt="Site du Pass Culture" />
            </Link>
            <Link href="https://www.gouvernement.fr">
              <Image
                src={logoGouvernement}
                alt="Site du Gouvernement Français"
              />
            </Link>
            <StyledDownloadBanner href={storeUrl} target="_blank">
              <p>Télécharger l’application sur les stores</p>
            </StyledDownloadBanner>
          </StyledLogos>

          <StyledLists>
            {FooterListContent.map((list, i) => (
              <React.Fragment key={i}>
                <FooterList title={list.title} listItems={list.listItems} />
                <FooterMobileList
                  title={list.title}
                  listItems={list.listItems}
                />
              </React.Fragment>
            ))}
          </StyledLists>
        </StyledTopSection>

        <StyledLegalLinks>
          {LegalLinks.map((link, i) => {
            return (
              <li key={i}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            )
          })}
        </StyledLegalLinks>
      </StyledContentContainer>
    </StyledFooter>
  )
}

const StyledFooter = styled.footer`
  background-color: #faf8fe;
`

const StyledContentContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 5rem 1rem;

  @media (max-width: 50rem) {
    padding: 2rem 1rem;
  }
`

const StyledTopSection = styled.div`
  display: grid;
  grid-template-columns: 25rem 1fr;
  align-items: start;
  gap: 6.25rem;
  margin-bottom: 5rem;

  @media (max-width: 50rem) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`

const StyledLogos = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  align-items: center;
  justify-items: start;
  gap: 3.125rem 3.75rem;

  img {
    border: 1px solid;
    max-width: 100%;
  }

  a:nth-child(2) img {
    mix-blend-mode: multiply;
  }

  @media (max-width: 50rem) {
    gap: 2rem;
  }
`

const StyledDownloadBanner = styled(Link)`
  grid-column: 1 / -1;
  justify-self: stretch;
  padding: 1.5rem 2rem;
  border-radius: 0.625rem;
  background: url('/images/banner-phone.svg'),
    linear-gradient(138.16deg, #610286 10%, #cc0261 100%);
  background-position: bottom right;
  background-size:
    auto 80%,
    cover;
  background-repeat: no-repeat;
  aspect-ratio: 3.1;
  display: flex;
  align-items: center;

  p {
    color: ${({ theme }) => theme.colors.white};
    font-size: ${({ theme }) => theme.fonts.sizes.xs};
    font-weight: ${({ theme }) => theme.fonts.weights.bold};
    text-transform: uppercase;
    max-width: 50%;
  }
`

const StyledLists = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
  gap: 4rem;

  @media (max-width: 50rem) {
    gap: 0;
    grid-template-columns: 1fr;
  }
`

const StyledLegalLinks = styled.ul`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  font-size: ${({ theme }) => theme.fonts.sizes.xs};
  font-weight: ${({ theme }) => theme.fonts.weights.semiBold};
  color: ${({ theme }) => theme.colors.black};
  opacity: 0.7;

  a:hover {
    text-decoration: underline;
  }

  @media (max-width: 50rem) {
    --legal-links-gap: 0.5rem;

    justify-content: initial;
    gap: var(--legal-links-gap);

    li {
      flex-basis: calc(50% - (var(--legal-links-gap) / 2));
    }
  }
`
