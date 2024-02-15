import React, { useRef, useState } from 'react'
import Link from 'next/link'
import styled, { css } from 'styled-components'

import { FocusTrap } from '../../../hooks/useFocusTrap'
import { Button } from '../button/Button'
import { Burger } from '../icons/Burger'
import { Close } from '../icons/Close'
import { PassCulture } from '../icons/PassCulture'
import { LoginDropdown, LoginItemProps } from './LoginDropdown'
import { MegaMenu } from './MegaMenu'
import { MobileMenu } from './mobile/MobileMenu'

export type HeaderProps = {
  TargetItems: HeaderNavigationItemProps[]
  AboutItems: HeaderNavigationItemProps[]
  Login: {
    ButtonLabel: string
    LoginItems: LoginItemProps[]
  }
  SignUp: { Label: string; URL: string }
}

type HeaderNavigationItemProps = {
  Label: string
  MegaMenu: {
    Title: string
    Cta: { Label: string; URL: string }
    BannerText?: string
    PrimaryListItems: { Label: string; URL: string }[]
    SecondaryListItems: { Label: string; URL: string }[]
    CardTitle: string
    CardDescription: string
    CardLink: { Label: string; URL: string }
    CardFirstEmoji: string
    CardSecondEmoji: string
  }
}

export function Header({
  TargetItems,
  AboutItems,
  Login,
  SignUp,
}: HeaderProps) {
  const [activeMegaMenuId, setActiveMegaMenuId] = useState<number | null>()

  const megaMenuButtonRefs = useRef<(HTMLButtonElement | null)[]>([])

  const navItems = [...TargetItems, ...AboutItems]

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

  // Close login dropdown + focus open button on "Escape"
  const [loginDropdownOpen, setLoginDropdownOpen] = useState(false)
  const loginButtonRef = useRef<HTMLButtonElement>(null)

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

    setTimeout(() => {
      mobileMenuButtonRef.current?.focus()
    }, 1)
  }

  // Close mobile menu + focus burger button on "Escape"
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null)

  function onMobileMenuKeyDown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      setShowMobileMenu(false)
      mobileMenuButtonRef.current?.focus()
    }
  }

  const Wrapper = showMobileMenu ? FocusTrap : React.Fragment

  return (
    <Wrapper>
      <StyledHeader>
        <StyledNavigation>
          <ul>
            <li>
              <StyledLogoLink href="/">
                <PassCulture />
              </StyledLogoLink>
            </li>

            {navItems.map((el, i) => {
              return (
                <React.Fragment key={el.Label}>
                  <StyledNavigationItem>
                    <button
                      ref={(el) => (megaMenuButtonRefs.current[i] = el)}
                      id={`mega-menu-button-${i}`}
                      aria-controls={`mega-menu-${i}`}
                      aria-expanded={i === activeMegaMenuId}
                      className={
                        i === activeMegaMenuId ? 'mega-menu-active' : ''
                      }
                      onClick={() => toggleMegaMenu(i)}
                      onKeyDown={(e) => onMegaMenuKeyDown(e, i)}>
                      {el.Label}
                    </button>
                    {i === activeMegaMenuId && (
                      <MegaMenu
                        getOpenButtonEl={() =>
                          megaMenuButtonRefs.current[i] ?? null
                        }
                        labelId={`mega-menu-button-${i}`}
                        id={`mega-menu-${i}`}
                        data={el.MegaMenu}
                        onBlur={onMegaMenuBlur}
                        onKeyDown={(e) => onMegaMenuKeyDown(e, i)}
                      />
                    )}
                  </StyledNavigationItem>
                  {i === TargetItems.length - 1 && (
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
                {Login.ButtonLabel}
              </button>
              {loginDropdownOpen && (
                <LoginDropdown
                  items={Login.LoginItems}
                  openButtonElement={loginButtonRef.current}
                  onKeyDown={onLoginDropdownKeyDown}
                  onBlur={onLoginDropdownBlur}
                />
              )}
            </StyledLoginItem>
            <li>
              <Button href={SignUp.URL} target="_blank">
                {SignUp.Label}
              </Button>
            </li>

            <li>
              <StyledMobileMenuButton
                ref={mobileMenuButtonRef}
                onClick={toggleMobileMenu}
                aria-label={`${showMobileMenu ? 'Fermer' : 'Ouvrir'} le menu`}
                aria-expanded={showMobileMenu}
                aria-controls="mobile-menu-main-navigation">
                {showMobileMenu ? <Close /> : <Burger />}
              </StyledMobileMenuButton>
            </li>
          </ul>
          {showMobileMenu && (
            <MobileMenu
              TargetItems={TargetItems}
              AboutItems={AboutItems}
              Login={Login}
              SignUp={SignUp}
              onKeyDown={(e) => onMobileMenuKeyDown(e)}
            />
          )}
        </StyledNavigation>
      </StyledHeader>
    </Wrapper>
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

const StyledLogoLink = styled(Link)`
  display: block;
  width: 9.5rem;
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
      color: ${theme.colors.primary};
      position: relative;

      &::after {
        content: '';
        position: absolute;
        left: 0.5rem;
        right: 0.5rem;
        bottom: 0;
        background: ${theme.colors.primary};
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
      align-items: center;
      justify-content: center;
    }
  `}
`
