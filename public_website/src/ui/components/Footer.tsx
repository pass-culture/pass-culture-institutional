import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'

import downloadBanner from '../../../public/images/download-banner.svg'
import logoGouvernement from '../../../public/images/logo-gouvernement.svg'
import logoPassCulture from '../../../public/images/logo-pass-culture.svg'

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

export const Footer = () => {
  return (
    <StyledFooter>
      <div className="content">
        <div className="top">
          <div className="logos">
            {/* TODO: replace with real images */}
            <Image src={logoPassCulture} alt="Pass Culture" />
            <Image
              src={logoGouvernement}
              alt="Gouvernement Français"
              className="governement"
            />
            <Image
              src={downloadBanner}
              alt="Télécharger l'application sur les stores"
              className="download"
            />
          </div>
          <div className="lists">
            {FooterListContent.map((list, i) => (
              <FooterList
                key={i}
                title={list.title}
                listItems={list.listItems}
              />
            ))}
          </div>
        </div>
        <ul className="legal-links">
          {LegalLinks.map((link, i) => {
            return (
              <li key={i}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            )
          })}
        </ul>
      </div>
    </StyledFooter>
  )
}

const StyledFooter = styled.footer`
  background-color: #faf8fe;

  .content {
    max-width: 1440px;
    margin: 0 auto;
    padding: 5rem 1rem;

    @media (max-width: 50rem) {
      padding: 2rem 1rem;
    }
  }

  .top {
    display: grid;
    grid-template-columns: 25rem 1fr;
    gap: 6.25rem;
    margin-bottom: 5rem;

    @media (max-width: 62.5rem) {
      grid-template-columns: 15rem 1fr;
      gap: 2rem;
    }

    @media (max-width: 50rem) {
      grid-template-columns: 1fr;
    }
  }

  .logos {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
    align-content: start;
    gap: 3.125rem 3.75rem;

    img {
      border: 1px solid;
      max-width: 100%;
    }

    .governement {
      mix-blend-mode: multiply;
    }

    .download {
      grid-column: 1 / -1;
      width: 100%;
    }
  }

  .lists {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 4rem;

    @media (max-width: 62.5rem) {
      gap: 2rem;
      grid-template-columns: 1fr 1fr;
    }

    @media (max-width: 50rem) {
      grid-template-columns: 1fr;
    }
  }

  .legal-links {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
    font-size: var(--fs-14);
    font-weight: 600;
    color: #000000;
    opacity: 0.7;

    a:hover {
      text-decoration: underline;
    }

    @media (max-width: 50rem) {
      justify-content: initial;
      gap: 0;

      li {
        flex-basis: 50%;
      }
    }
  }
`

type ListProps = {
  title: string
  listItems: { label: string; href: string }[]
}

const FooterList = ({ title, listItems }: ListProps) => {
  return (
    <StyledFooterList>
      <h3>{title}</h3>
      <ul>
        {listItems.map((el, i) => {
          return (
            <li key={i}>
              <a href={el.href}>{el.label}</a>
            </li>
          )
        })}
      </ul>
    </StyledFooterList>
  )
}

const StyledFooterList = styled.div`
  h3 {
    color: var(--c-hard-blue);
    text-transform: uppercase;
    font-size: 0.875rem;
    margin-bottom: 1rem;
    font-weight: 700;
  }

  li {
    color: #000000;
    opacity: 0.7;
    font-size: 1rem;
    font-weight: 600;

    &:not(:last-child) {
      margin-bottom: 1rem;
    }

    a:hover {
      text-decoration: underline;
    }
  }
`
