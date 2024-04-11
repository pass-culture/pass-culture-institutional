import React, { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import styled, { css } from 'styled-components'

import { FocusTrap } from '../../../hooks/useFocusTrap'
import { Button } from '../button/Button'
import { Burger } from '../icons/Burger'
import { Close } from '../icons/Close'
import { PassCulture } from '../icons/PassCulture'
import { AccountDropdown, AccountItemProps } from './AccountDropdown'
import { MegaMenu } from './MegaMenu'
import { MobileMenu } from './mobile/MobileMenu'
import { Link } from '@/ui/components/Link'

export type HeaderProps = {
  targetItems: HeaderNavigationItemProps[]
  aboutItems: HeaderNavigationItemProps[]
  login: {
    buttonLabel: string
    items: AccountItemProps[]
  }
  signup: {
    buttonLabel: string
    items: AccountItemProps[]
  }
}

type HeaderNavigationItemProps = {
  label: string
  megaMenu: {
    title: string
    cta: { Label: string; URL: string }
    bannerText?: string
    primaryListItems: { Label: string; URL: string }[]
    secondaryListItems: { Label: string; URL: string }[]
    cardTitle: string
    cardDescription: string
    cardLink: { Label: string; URL: string }
    cardFirstEmoji: string
    cardSecondEmoji: string
  }
}

export function Header({
  targetItems,
  aboutItems,
  login,
  signup,
}: HeaderProps) {
  const [activeMegaMenuId, setActiveMegaMenuId] = useState<number | null>(null)

  const megaMenuButtonRefs = useRef<(HTMLButtonElement | null)[]>([])

  const navItems = [...targetItems, ...aboutItems]

  // Toggle mega menu panel
  function toggleMegaMenu(id: number) {
    setActiveMegaMenuId(id === activeMegaMenuId ? null : id)
    setLoginDropdownOpen(false)
    setSignupDropdownOpen(false)
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
    if (activeMegaMenuId !== null) {
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

  // On mouse over, close everything except login dropdown
  function onLoginDropdownMouseEnter() {
    setLoginDropdownOpen(!loginDropdownOpen)
    setSignupDropdownOpen(false)
    setActiveMegaMenuId(null)
  }

  // Close signup dropdown + focus open button on "Escape"
  const [signupDropdownOpen, setSignupDropdownOpen] = useState(false)
  const signupButtonRef = useRef<HTMLButtonElement>(null)

  function onSignupDropdownKeyDown() {
    setSignupDropdownOpen(false)
    signupButtonRef.current?.focus()
  }

  // Close signup dropdown on click outside of it or on links inside
  function onSignupDropdownBlur() {
    if (signupDropdownOpen) {
      setSignupDropdownOpen(false)
    }
  }

  // On mouse over, close everything except signup dropdown
  function onSignupDropdownMouseEnter() {
    setSignupDropdownOpen(!signupDropdownOpen)
    setLoginDropdownOpen(false)
    setActiveMegaMenuId(null)
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

  // Close mobile menu on navigation
  const currentPath = usePathname()
  const [previousPath, setPreviousPath] = useState(currentPath)
  useEffect(() => {
    if (showMobileMenu && currentPath !== previousPath) {
      setShowMobileMenu(false)
      setPreviousPath(currentPath)
      mobileMenuButtonRef.current?.focus()
    }
  }, [currentPath, showMobileMenu, previousPath])

  const Wrapper = showMobileMenu ? FocusTrap : React.Fragment

  return (
    <Wrapper>
      <StyledHeader>
        <StyledHeaderContent>
          <StyledNavigation
            $showMobileMenu={showMobileMenu}
            $showMegaMenu={activeMegaMenuId !== null}>
            <ul>
              <li>
                <StyledLogoLink href="/">
                  <PassCulture />
                </StyledLogoLink>
              </li>

              {navItems.map((el, i) => {
                return (
                  <React.Fragment key={el.label}>
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
                        onKeyDown={(e) => onMegaMenuKeyDown(e, i)}
                        onMouseEnter={() => toggleMegaMenu(i)}>
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
                          onMouseLeave={() => setActiveMegaMenuId(null)}
                        />
                      )}
                    </StyledNavigationItem>
                    {i === targetItems.length - 1 && (
                      <StyledNavigationItem aria-hidden="true" />
                    )}
                  </React.Fragment>
                )
              })}

              <StyledLoginItem>
                <button
                  ref={loginButtonRef}
                  id="login-dropdown"
                  aria-controls="account-menu"
                  aria-expanded={loginDropdownOpen}
                  className={loginDropdownOpen ? 'mega-menu-active' : ''}
                  onClick={() => setLoginDropdownOpen(!loginDropdownOpen)}
                  onMouseEnter={onLoginDropdownMouseEnter}>
                  {login.buttonLabel}
                </button>
                {loginDropdownOpen && (
                  <AccountDropdown
                    items={login.items}
                    openButtonElement={loginButtonRef.current}
                    labelId="login-dropdown"
                    onKeyDown={onLoginDropdownKeyDown}
                    onBlur={onLoginDropdownBlur}
                    onMouseLeave={() =>
                      setLoginDropdownOpen(!loginDropdownOpen)
                    }
                  />
                )}
              </StyledLoginItem>

              <StyledSignupItem>
                <Button
                  ref={signupButtonRef}
                  id="signup-dropdown"
                  aria-controls="account-menu"
                  aria-expanded={signupDropdownOpen}
                  onClick={() => setSignupDropdownOpen(!signupDropdownOpen)}
                  onMouseEnter={onSignupDropdownMouseEnter}>
                  {signup.buttonLabel}
                </Button>
                {signupDropdownOpen && (
                  <AccountDropdown
                    items={signup.items}
                    openButtonElement={signupButtonRef.current}
                    labelId="signup-dropdown"
                    align="right"
                    onKeyDown={onSignupDropdownKeyDown}
                    onBlur={onSignupDropdownBlur}
                    onMouseLeave={() =>
                      setSignupDropdownOpen(!signupDropdownOpen)
                    }
                  />
                )}
              </StyledSignupItem>

              <StyledMobileMenuListItem>
                <StyledMobileMenuButton
                  ref={mobileMenuButtonRef}
                  onClick={toggleMobileMenu}
                  aria-label={`${showMobileMenu ? 'Fermer' : 'Ouvrir'} le menu`}
                  aria-expanded={showMobileMenu}
                  aria-controls="mobile-menu-main-navigation">
                  {showMobileMenu ? <Close /> : <Burger />}
                </StyledMobileMenuButton>
              </StyledMobileMenuListItem>
            </ul>
            {showMobileMenu && (
              <MobileMenu
                targetItems={targetItems}
                aboutItems={aboutItems}
                login={login}
                signup={signup}
                onKeyDown={(e) => onMobileMenuKeyDown(e)}
              />
            )}
          </StyledNavigation>
        </StyledHeaderContent>
      </StyledHeader>
    </Wrapper>
  )
}

const StyledHeader = styled.header`
  position: relative;
  z-index: 1;
`

const StyledHeaderContent = styled.div`
  max-width: 90rem;
  margin: 0 auto;
`

const StyledNavigation = styled.nav<{
  $showMobileMenu: boolean
  $showMegaMenu: boolean
}>`
  ${({ theme, $showMobileMenu, $showMegaMenu }) => css`
    background: ${$showMegaMenu ? theme.colors.lightBlue : 'none'};

    > ul {
      background: ${$showMobileMenu ? theme.colors.white : 'none'};
      display: flex;
      align-items: center;
      gap: 1.5rem;
      padding: 2rem 2.5rem;
      height: 4rem;

      @media (width < ${theme.mediaQueries.largeDesktop}) {
        justify-content: space-between;
        gap: 0.5rem;
        padding: 1rem;
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
  cursor: pointer;
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
        left: 0;
        right: 0;
        bottom: 0;
        background: ${theme.colors.primary};
        height: 1px;
      }
    }
    &:focus {
      color: ${theme.colors.primary};
      position: relative;
      outline: 1px solid ${theme.colors.primary};
    }
    button {
      cursor: pointer;
      position: relative;
      color: ${theme.colors.black};
      font-size: ${theme.fonts.sizes.xs};
      font-weight: ${theme.fonts.weights.medium};
    }
  `}
`

const StyledLoginItem = styled.li`
  ${({ theme }) => css`
    margin-left: auto;
    position: relative;
    .mega-menu-active {
      color: ${theme.colors.primary};
      position: relative;

      &::after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        background: ${theme.colors.primary};
        height: 1px;
      }
    }
    button {
      cursor: pointer;
      color: ${theme.colors.black};
      font-size: ${theme.fonts.sizes.xs};
      font-weight: ${theme.fonts.weights.medium};
      padding: 0 0.5rem;
    }
  `}
`

const StyledSignupItem = styled.li`
  position: relative;
`

const StyledMobileMenuListItem = styled.li`
  ${({ theme }) => css`
    display: none;

    @media (width < ${theme.mediaQueries.tablet}) {
      display: block;
    }
  `}
`

const StyledMobileMenuButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 1.5rem;
  width: 1.75rem;
`
