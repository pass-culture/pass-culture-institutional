import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'

import accordionChevron from '../../../public/images/accordion-chevron.svg'
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
            {/* TODO: get real svg files */}
            <Link href="https://pass.culture.fr/">
              <Image src={logoPassCulture} alt="Site du Pass Culture" />
            </Link>
            <Link href="https://www.gouvernement.fr">
              <Image
                src={logoGouvernement}
                alt="Site du Gouvernement Français"
                className="governement"
              />
            </Link>
            {/* TODO: compute store URL */}
            <Link href="#" target="_blank" className="download">
              <p>Télécharger l’application sur les stores</p>
            </Link>
          </div>

          <div className="lists">
            {FooterListContent.map((list, i) => (
              <React.Fragment key={i}>
                <FooterList title={list.title} listItems={list.listItems} />
                <MobileFooterList
                  title={list.title}
                  listItems={list.listItems}
                />
              </React.Fragment>
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
    align-items: start;
    gap: 6.25rem;
    margin-bottom: 5rem;

    @media (max-width: 50rem) {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
  }

  .logos {
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

    .governement {
      mix-blend-mode: multiply;
    }

    .download {
      grid-column: 1 / -1;
      justify-self: stretch;
      padding: 1.5rem 2rem;
      border-radius: 0.625rem;
      background: url('/images/banner-phone.svg'),
        linear-gradient(138.16deg, #610286 10%, var(--c-pink-one) 100%);
      background-position: bottom right;
      background-size:
        auto 80%,
        cover;
      background-repeat: no-repeat;
      aspect-ratio: 3.1;
      display: flex;
      align-items: center;

      p {
        color: #ffffff;
        font-size: var(--fs-14);
        font-weight: 700;
        text-transform: uppercase;
        max-width: 50%;
      }
    }

    @media (max-width: 50rem) {
      gap: 2rem;
    }
  }

  .lists {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
    gap: 4rem;

    @media (max-width: 50rem) {
      gap: 0;
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
      --legal-links-gap: 0.5rem;

      justify-content: initial;
      gap: var(--legal-links-gap);

      li {
        flex-basis: calc(50% - (var(--legal-links-gap) / 2));
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

const MobileFooterList = ({ title, listItems }: ListProps) => {
  return (
    <StyledMobileFooterList>
      <summary>
        <h3>{title}</h3>
        <Image src={accordionChevron} alt="" />
      </summary>
      <ul>
        {listItems.map((el, i) => {
          return (
            <li key={i}>
              <a href={el.href}>{el.label}</a>
            </li>
          )
        })}
      </ul>
    </StyledMobileFooterList>
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

  @media (max-width: 50rem) {
    display: none;
  }
`

const StyledMobileFooterList = styled.details`
  display: none;

  summary {
    list-style: none;
    display: inline-flex;
    align-items: center;
    gap: 1rem;
  }

  h3 {
    color: #000000;
    font-size: var(--fs-14);
    font-weight: 700;
    text-transform: uppercase;
    padding: 1rem 0;
  }

  summary img {
    transform: rotate(180deg);
  }

  &[open] summary img {
    transform: none;
  }

  li {
    color: #000000;
    opacity: 0.7;
    font-size: var(--fs-15);
    font-weight: 600;
    margin-bottom: 0.875rem;

    a:hover {
      text-decoration: underline;
    }
  }

  @media (max-width: 50rem) {
    display: initial;
  }
`
