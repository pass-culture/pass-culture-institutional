import React, { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'

import LogoPassCulture from '../../../../public/images/logo-pass-culture.svg'
import { LoginDropdown } from './LoginDropdown'
import { MegaMenu } from './MegaMenu'

// TODO: put data in Strapi
const navTargetElements = [
  {
    label: 'Jeunes et parents',
    megaMenu: {
      heading: 'Faites découvrir vos offres culturelles aux jeunes',
      cta: { label: 'S’inscrire en tant qu’acteur culturel', url: '#' },
      mainList: [
        { label: 'L’essentiel du pass Culture', url: '#' },
        { label: 'Comment proposer des offres ?', url: '#' },
        { label: 'Le programme Ambassadeurs', url: '#' },
        { label: 'Actualités et prochains rendez-vous', url: '#' },
      ],
      secondaryList: [{ label: 'Aide et support', url: '#' }],
      cardTitle: 'Webinaire',
      cardDescription:
        'Participez au prochain webinaire à destination des acteurs culturels',
      cardLink: { label: 'S’inscrire', url: '#' },
    },
  },
  {
    label: 'Acteurs culturels',
    megaMenu: {
      heading: 'Faites découvrir vos offres culturelles aux jeunes',
      cta: { label: 'S’inscrire en tant qu’acteur culturel', url: '#' },
      mainList: [
        { label: 'L’essentiel du pass Culture', url: '#' },
        { label: 'Comment proposer des offres ?', url: '#' },
        { label: 'Le programme Ambassadeurs', url: '#' },
        { label: 'Actualités et prochains rendez-vous', url: '#' },
      ],
      secondaryList: [{ label: 'Aide et support', url: '#' }],
      cardTitle: 'Webinaire',
      cardDescription:
        'Participez au prochain webinaire à destination des acteurs culturels',
      cardLink: { label: 'S’inscrire', url: '#' },
    },
  },
  {
    label: 'Enseignants',
    megaMenu: {
      heading: 'Faites découvrir vos offres culturelles aux jeunes',
      cta: { label: 'S’inscrire en tant qu’acteur culturel', url: '#' },
      mainList: [
        { label: 'L’essentiel du pass Culture', url: '#' },
        { label: 'Comment proposer des offres ?', url: '#' },
        { label: 'Le programme Ambassadeurs', url: '#' },
        { label: 'Actualités et prochains rendez-vous', url: '#' },
      ],
      secondaryList: [{ label: 'Aide et support', url: '#' }],
      cardTitle: 'Webinaire',
      cardDescription:
        'Participez au prochain webinaire à destination des acteurs culturels',
      cardLink: { label: 'S’inscrire', url: '#' },
    },
  },
  {
    label: 'Partenaires',
    megaMenu: {
      heading: 'Faites découvrir vos offres culturelles aux jeunes',
      cta: { label: 'S’inscrire en tant qu’acteur culturel', url: '#' },
      mainList: [
        { label: 'L’essentiel du pass Culture', url: '#' },
        { label: 'Comment proposer des offres ?', url: '#' },
        { label: 'Le programme Ambassadeurs', url: '#' },
        { label: 'Actualités et prochains rendez-vous', url: '#' },
      ],
      secondaryList: [{ label: 'Aide et support', url: '#' }],
      cardTitle: 'Webinaire',
      cardDescription:
        'Participez au prochain webinaire à destination des acteurs culturels',
      cardLink: { label: 'S’inscrire', url: '#' },
    },
  },
]
const navAllTargetsElements = [
  {
    label: 'Nous connaître',
    megaMenu: {
      heading: 'Faites découvrir vos offres culturelles aux jeunes',
      cta: { label: 'S’inscrire en tant qu’acteur culturel', url: '#' },
      mainList: [
        { label: 'L’essentiel du pass Culture', url: '#' },
        { label: 'Comment proposer des offres ?', url: '#' },
        { label: 'Le programme Ambassadeurs', url: '#' },
        { label: 'Actualités et prochains rendez-vous', url: '#' },
      ],
      secondaryList: [{ label: 'Aide et support', url: '#' }],
      cardTitle: 'Webinaire',
      cardDescription:
        'Participez au prochain webinaire à destination des acteurs culturels',
      cardLink: { label: 'S’inscrire', url: '#' },
    },
  },
  {
    label: 'Newsroom',
    megaMenu: {
      heading: 'Faites découvrir vos offres culturelles aux jeunes',
      cta: { label: 'S’inscrire en tant qu’acteur culturel', url: '#' },
      mainList: [
        { label: 'L’essentiel du pass Culture', url: '#' },
        { label: 'Comment proposer des offres ?', url: '#' },
        { label: 'Le programme Ambassadeurs', url: '#' },
        { label: 'Actualités et prochains rendez-vous', url: '#' },
      ],
      secondaryList: [{ label: 'Aide et support', url: '#' }],
      cardTitle: 'Webinaire',
      cardDescription:
        'Participez au prochain webinaire à destination des acteurs culturels',
      cardLink: { label: 'S’inscrire', url: '#' },
    },
  },
]
const navElements = [...navTargetElements, ...navAllTargetsElements]
const loginLabel = 'Connexion'
const signUpLabel = 'Inscription'

export function Header() {
  const [activeMegaMenuId, setActiveMegaMenuId] = useState<number | null>()

  const megaMenuButtonRefs = useRef<(HTMLButtonElement | null)[]>([])

  // Toggle mega menu panel
  function toggleMegaMenu(id: number) {
    setActiveMegaMenuId(id === activeMegaMenuId ? null : id)
  }

  // Close mega menu + focus open button on "Escape"
  function onMegaMenuKeyDown(
    e: KeyboardEvent | React.KeyboardEvent,
    i: number
  ) {
    if (e.key === 'Escape') {
      setActiveMegaMenuId(null)
      megaMenuButtonRefs.current[i]?.focus()
    }
  }

  // Close mega menu on click outside of it or on links inside
  function onMegaMenuBlur() {
    if (activeMegaMenuId) {
      setActiveMegaMenuId(null)
    }
  }

  const [loginDropdownOpen, setLoginDropdownOpen] = useState(false)
  const loginButtonRef = useRef<HTMLButtonElement>(null)

  // Close login dropdown + focus open button on "Escape"
  function onLoginDropdownKeyDown() {
    setLoginDropdownOpen(false)
    loginButtonRef.current?.focus()
  }

  // Close login dropdown on click outside of it or on links inside
  function onLoginDropdownBlur() {
    if (loginDropdownOpen) {
      setLoginDropdownOpen(false)
    }
  }

  return (
    <StyledHeader>
      <nav>
        <ul className="main-nav">
          <li className="logo">
            <Link href="/">
              <Image src={LogoPassCulture} alt="Page d'accueil" width="150" />
            </Link>
          </li>

          {navElements.map((el, i) => {
            return (
              <React.Fragment key={i}>
                <li>
                  <button
                    ref={(el) => (megaMenuButtonRefs.current[i] = el)}
                    id={`mega-menu-button-${i}`}
                    aria-controls={`mega-menu-${i}`}
                    aria-expanded={i === activeMegaMenuId}
                    className={i === activeMegaMenuId ? 'mega-menu-active' : ''}
                    onClick={() => toggleMegaMenu(i)}
                    onKeyDown={(e) => onMegaMenuKeyDown(e, i)}>
                    {el.label}
                  </button>
                  {i === activeMegaMenuId && (
                    <MegaMenu
                      getOpenButtonEl={() =>
                        megaMenuButtonRefs.current[i] ?? null
                      }
                      labelId={`mega-menu-button-${i}`}
                      id={`mega-menu-${i}`}
                      data={el.megaMenu}
                      onBlur={onMegaMenuBlur}
                      onKeyDown={(e) => onMegaMenuKeyDown(e, i)}
                    />
                  )}
                </li>
                {i === navTargetElements.length - 1 && (
                  <li aria-hidden="true" />
                )}
              </React.Fragment>
            )
          })}

          <li className="login">
            <button
              ref={loginButtonRef}
              id="login-dropdown"
              aria-controls="login-menu"
              aria-expanded={loginDropdownOpen}
              onClick={() => setLoginDropdownOpen(!loginDropdownOpen)}>
              {loginLabel}
            </button>
            {loginDropdownOpen && (
              <LoginDropdown
                openButtonElement={loginButtonRef.current}
                onKeyDown={onLoginDropdownKeyDown}
                onBlur={onLoginDropdownBlur}
              />
            )}
          </li>
          <li>
            <Link href="#">{signUpLabel}</Link>
          </li>

          <li>
            <button className="burger" aria-label="Ouvrir le menu">
              <span />
              <span />
              <span />
            </button>
          </li>
        </ul>
      </nav>
    </StyledHeader>
  )
}

const StyledHeader = styled.header`
  max-width: 1440px;
  margin: 0 auto;
  position: relative;

  .main-nav {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    padding: 2rem 1rem;
    height: 4rem;

    > li {
      .logo {
        margin-right: 1rem;

        img {
          display: block;
          width: 9.375rem;
        }
      }

      &.login {
        margin-left: auto;
        position: relative;
      }

      &[aria-hidden] {
        background-color: ${(props) => props.theme.colors.black};
        opacity: 0.2;
        height: 1.25rem;
        width: 1px;
      }

      .mega-menu-active {
        color: #94008c;
        position: relative;

        &::after {
          content: '';
          position: absolute;
          left: 0.5rem;
          right: 0.5rem;
          bottom: 0;
          background: #94008c;
          height: 1px;
        }
      }

      button {
        background: none;
        border: none;
        font-size: ${(props) => props.theme.fonts.sizes[14]};
        font-weight: 500;
        padding: 0.5rem;

        &.burger {
          display: none;
          flex-direction: column;
          gap: 0.5rem;
          padding: 0;

          span {
            background-color: #94008c;
            height: 0.1rem;
            width: 1.75rem;
          }

          @media (max-width: 62.5rem) {
            display: flex;
          }
        }
      }

      &:not(:first-child, :last-child) {
        @media (max-width: 62.5rem) {
          display: none;
        }
      }
    }

    @media (max-width: 62.5rem) {
      justify-content: space-between;
      padding: 1.5rem 1rem;
    }
  }
`
