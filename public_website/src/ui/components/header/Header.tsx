import React, { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styled, { css } from 'styled-components'

import LogoPassCulture from '../../../../public/images/logo-pass-culture.svg'
import { LoginDropdown } from './LoginDropdown'
import { MegaMenu } from './MegaMenu'
import { MobileMenu } from './MobileMenu'

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

  // Toggle mobile menu + disable scroll on body
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  function toggleMobileMenu() {
    setShowMobileMenu(!showMobileMenu)
    showMobileMenu
      ? document.body.removeAttribute('style')
      : document.body.setAttribute('style', 'overflow: hidden')
  }

  return (
    <StyledHeader>
      <StyledNavigation>
        <ul>
          <li>
            <Link href="/">
              <Image src={LogoPassCulture} alt="Page d'accueil" width="150" />
            </Link>
          </li>

          {navElements.map((el, i) => {
            return (
              <React.Fragment key={i}>
                <StyledNavigationItem>
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
                </StyledNavigationItem>
                {i === navTargetElements.length - 1 && (
                  <StyledNavigationItem aria-hidden="true" />
                )}
              </React.Fragment>
            )
          })}

          <StyledLoginItem>
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
          </StyledLoginItem>
          <li>
            <Link href="#">{signUpLabel}</Link>
          </li>

          <li>
            <StyledMobileMenuButton
              onClick={toggleMobileMenu}
              aria-label={`${showMobileMenu ? 'Fermer' : 'Ouvrir'} le menu`}>
              {showMobileMenu ? (
                <StyledCrossMenu>
                  <span />
                  <span />
                </StyledCrossMenu>
              ) : (
                <StyledBurgerMenu>
                  <span />
                  <span />
                  <span />
                </StyledBurgerMenu>
              )}
            </StyledMobileMenuButton>
          </li>
        </ul>
      </StyledNavigation>
      {showMobileMenu && <MobileMenu />}
    </StyledHeader>
  )
}

const StyledHeader = styled.header`
  max-width: 1440px;
  margin: 0 auto;
  position: relative;
`

const StyledNavigation = styled.nav`
  ${({ theme }) => css`
    > ul {
      display: flex;
      align-items: center;
      gap: 1.5rem;
      padding: 2rem 1rem;
      height: 4rem;

      @media (width < ${theme.mediaQueries.tablet}) {
        justify-content: space-between;
        padding: 1.5rem;
      }

      /* Only show logo + burger menu on mobile */
      li:not(:first-child, :last-child) {
        @media (width < ${theme.mediaQueries.tablet}) {
          display: none;
        }
      }
    }
  `}
`

const StyledNavigationItem = styled.li`
  ${({ theme }) => css`
    &:first-child {
      margin-right: 1rem;

      img {
        display: block;
        width: 9.375rem;
      }
    }

    &[aria-hidden] {
      background-color: ${theme.colors.black};
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
      font-size: ${theme.fonts.sizes.xs};
      font-weight: ${theme.fonts.weights.medium};
      padding: 0.5rem;
    }
  `}
`

const StyledLoginItem = styled.li`
  ${({ theme }) => css`
    margin-left: auto;
    position: relative;

    button {
      font-size: ${theme.fonts.sizes.xs};
      font-weight: ${theme.fonts.weights.medium};
      padding: 0.5rem;
    }
  `}
`
const StyledMobileMenuButton = styled.button`
  ${({ theme }) => css`
    display: none;
    height: 1.5rem;
    width: 1.75rem;

    @media (width < ${theme.mediaQueries.tablet}) {
      display: flex;
    }
  `}
`

const StyledBurgerMenu = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0;
  width: 100%;

  span {
    background-color: #94008c;
    height: 0.1rem;
    width: 100%;
  }
`

const StyledCrossMenu = styled.div`
  position: relative;
  width: 100%;

  span {
    background-color: #94008c;
    position: absolute;
    top: 50%;
    left: 50%;
    height: 0.1rem;
    width: 100%;
    transform: translateX(-50%) rotate(-45deg);
    transform-origin: center;

    &:last-child {
      transform: translateX(-50%) rotate(45deg);
    }
  }
`
