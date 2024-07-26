import React, { useEffect, useMemo, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import styled, { css } from 'styled-components'

import { FocusTrap } from '../../../hooks/useFocusTrap'
import { Button } from '../button/Button'
import { Burger } from '../icons/Burger'
import { Close } from '../icons/Close'
import { PassCulture } from '../icons/PassCulture'
import { AccountDropdown } from './AccountDropdown'
import { MegaMenu } from './MegaMenu'
import { MobileMenu } from './mobile/MobileMenu'
import { useWindowSize } from '@/hooks/useWindowSize'
import BlockRendererWithCondition from '@/lib/BlockRendererWithCondition'
import { MediaQueries } from '@/theme/media-queries'
import { CTA } from '@/types/CTA'
import { HeaderMenuProps, HeaderNavigationItemProps } from '@/types/props'
import { Link } from '@/ui/components/Link'
import { getMediaQuery } from '@/utils/getMediaQuery'
import { isStringAreEquals } from '@/utils/stringAreEquals'

/**
 *
 *
 * @param {CTA[]} items
 * @param {string} path
 * @return {*}  {boolean}
 */
const findInMenu = (items: CTA[], str: string): boolean => {
  for (const item of items) {
    if (isStringAreEquals(item.URL, str)) return true
  }
  return false
}
/**
 *
 *
 * @param {string} path
 * @param {HeaderNavigationItemProps[]} collections
 * @return {*}  {(number)}
 */
const findCollectionIdByPath = (
  path: string,
  collections: HeaderNavigationItemProps[]
): number => {
  for (const collection of collections) {
    const { megaMenu } = collection

    if (megaMenu.primaryListItems.length > 0) {
      if (findInMenu(megaMenu.primaryListItems, path)) {
        const index = collections.findIndex(
          (item) => item.label === collection.label
        )
        return index
      }
      if (megaMenu.secondaryListItems.length > 0) {
        if (findInMenu(megaMenu.secondaryListItems, path)) {
          const index = collections.findIndex(
            (item) => item.label === collection.label
          )
          return index
        }
      }
    }
  }

  return -1
}

const MEDIA_QUERY = getMediaQuery(MediaQueries.LARGE_DESKTOP)

export function Header(props: HeaderMenuProps) {
  const { targetItems, aboutItems, login, signup } = props
  const [activeMegaMenuId, setActiveMegaMenuId] = useState<number | null>(null)
  const megaMenuButtonRefs = useRef<(HTMLButtonElement | null)[]>([])
  const [activeId, setActiveId] = useState<number>(-1)
  const pathname = usePathname()
  const { width = 0 } = useWindowSize({ debounceDelay: 50 })
  const navItems = useMemo(
    () => [...targetItems, ...aboutItems],
    [aboutItems, targetItems]
  )

  // Set active menu on hover and if asPath is including in navItems
  const isActive = (i: number): string =>
    i === activeMegaMenuId || activeId === i ? 'mega-menu-active' : ''

  // Toggle mega menu panel
  function toggleMegaMenu(id: number): void {
    setActiveMegaMenuId(id === activeMegaMenuId ? null : id)
    setLoginDropdownOpen(false)
    setSignupDropdownOpen(false)
  }

  // Close mega menu + focus open button on "Escape"
  function onMegaMenuKeyDown(
    e: KeyboardEvent | React.KeyboardEvent,
    i: number
  ): void {
    if (e.key === 'Escape') {
      setActiveMegaMenuId(null)
      megaMenuButtonRefs.current[i]?.focus()
    }
  }

  // Close mega menu on click outside of it or on links inside
  function onMegaMenuBlur(): void {
    if (activeMegaMenuId !== null) {
      setActiveMegaMenuId(null)
    }
  }

  // Close login dropdown + focus open button on "Escape"
  const [loginDropdownOpen, setLoginDropdownOpen] = useState<boolean>(false)
  const loginButtonRef = useRef<HTMLButtonElement | null>(null)

  function onLoginDropdownKeyDown(): void {
    setLoginDropdownOpen(false)
    loginButtonRef.current?.focus()
  }

  // Close login dropdown on click outside of it or on links inside
  function onLoginDropdownBlur(): void {
    if (loginDropdownOpen) {
      setLoginDropdownOpen(false)
    }
  }

  // On mouse over, close everything except login dropdown
  function onLoginDropdownMouseEnter(): void {
    setLoginDropdownOpen(!loginDropdownOpen)
    setSignupDropdownOpen(false)
    setActiveMegaMenuId(null)
  }

  // Close signup dropdown + focus open button on "Escape"
  const [signupDropdownOpen, setSignupDropdownOpen] = useState<boolean>(false)
  const signupButtonRef = useRef<HTMLButtonElement | null>(null)

  function onSignupDropdownKeyDown(): void {
    setSignupDropdownOpen(false)
    signupButtonRef.current?.focus()
  }

  // Close signup dropdown on click outside of it or on links inside
  function onSignupDropdownBlur(): void {
    if (signupDropdownOpen) {
      setSignupDropdownOpen(false)
    }
  }

  // On mouse over, close everything except signup dropdown
  function onSignupDropdownMouseEnter(): void {
    setSignupDropdownOpen(!signupDropdownOpen)
    setLoginDropdownOpen(false)
    setActiveMegaMenuId(null)
  }

  // Toggle mobile menu + disable scroll on body
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false)
  function toggleMobileMenu(): void {
    setShowMobileMenu((showMobileMenu): boolean => !showMobileMenu)
    showMobileMenu
      ? document.body.removeAttribute('style')
      : document.body.setAttribute('style', 'overflow: hidden')

    setTimeout(() => {
      mobileMenuButtonRef.current?.focus()
    }, 1)
  }

  // Close mobile menu + focus burger button on "Escape"
  const mobileMenuButtonRef = useRef<HTMLButtonElement | null>(null)

  function onMobileMenuKeyDown(e: KeyboardEvent): void {
    if (e.key === 'Escape') {
      setShowMobileMenu(false)
      mobileMenuButtonRef.current?.focus()
    }
  }

  const isHome = (): boolean => {
    return pathname === '/'
  }

  // Close mobile menu on navigation
  const currentPath = usePathname()
  const [previousPath, setPreviousPath] = useState<string>(currentPath)
  useEffect(() => {
    if (showMobileMenu && currentPath !== previousPath) {
      setShowMobileMenu(false)
      document.body.removeAttribute('style')
      setPreviousPath(currentPath)

      setTimeout(() => {
        mobileMenuButtonRef.current?.focus()
      }, 1)
    }
  }, [currentPath, showMobileMenu, previousPath])

  useEffect(() => {
    const activeId = findCollectionIdByPath(currentPath, navItems)

    setActiveId(activeId)
  }, [currentPath, navItems, previousPath])

  // We need to close mobile menu if we resize the window
  useEffect(() => {
    if (width > MEDIA_QUERY) setShowMobileMenu(false)
  }, [width])

  const Wrapper = showMobileMenu ? FocusTrap : React.Fragment

  return (
    <Wrapper>
      <StyledHeader
        $activeId={isHome()}
        $showMegaMenu={activeMegaMenuId !== null}
        $showMobileMenu={showMobileMenu}>
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
                        // @ts-expect-error //main pull
                        ref={(el) => (megaMenuButtonRefs.current[i] = el)}
                        id={`mega-menu-button-${i}`}
                        aria-controls={`mega-menu-${i}`}
                        aria-expanded={i === activeMegaMenuId}
                        className={isActive(i)}
                        onClick={() => toggleMegaMenu(i)}
                        onKeyDown={(e) => onMegaMenuKeyDown(e, i)}
                        onMouseEnter={() => toggleMegaMenu(i)}>
                        {el.label}
                      </button>

                      <BlockRendererWithCondition
                        condition={i === activeMegaMenuId}>
                        <MegaMenu
                          getOpenButtonEl={() =>
                            megaMenuButtonRefs.current[i] ?? null
                          }
                          labelId={`mega-menu-button-${i}`}
                          id={`mega-menu-${i}`}
                          data={el.megaMenu}
                          onBlur={onMegaMenuBlur}
                          onKeyDown={(e): void => onMegaMenuKeyDown(e, i)}
                          onMouseLeave={(): void => setActiveMegaMenuId(null)}
                        />
                      </BlockRendererWithCondition>
                    </StyledNavigationItem>

                    <BlockRendererWithCondition
                      condition={i === targetItems.length - 1}>
                      <StyledNavigationItem aria-hidden="true" />
                    </BlockRendererWithCondition>
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
                  onClick={(): void => setLoginDropdownOpen(!loginDropdownOpen)}
                  onMouseEnter={onLoginDropdownMouseEnter}>
                  {login.buttonLabel}
                </button>

                <BlockRendererWithCondition condition={loginDropdownOpen}>
                  <AccountDropdown
                    items={login.items}
                    openButtonElement={loginButtonRef.current}
                    labelId="login-dropdown"
                    onKeyDown={onLoginDropdownKeyDown}
                    onBlur={onLoginDropdownBlur}
                    onMouseLeave={(): void =>
                      setLoginDropdownOpen(!loginDropdownOpen)
                    }
                  />
                </BlockRendererWithCondition>
              </StyledLoginItem>

              <StyledSignupItem>
                <Button
                  ref={signupButtonRef}
                  id="signup-dropdown"
                  aria-controls="account-menu"
                  aria-expanded={signupDropdownOpen}
                  onClick={(): void =>
                    setSignupDropdownOpen(!signupDropdownOpen)
                  }
                  onMouseEnter={onSignupDropdownMouseEnter}>
                  {signup.buttonLabel}
                </Button>

                <BlockRendererWithCondition condition={signupDropdownOpen}>
                  <AccountDropdown
                    items={signup.items}
                    openButtonElement={signupButtonRef.current}
                    labelId="signup-dropdown"
                    align="right"
                    onKeyDown={onSignupDropdownKeyDown}
                    onBlur={onSignupDropdownBlur}
                    onMouseLeave={(): void =>
                      setSignupDropdownOpen(!signupDropdownOpen)
                    }
                  />
                </BlockRendererWithCondition>
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

            <BlockRendererWithCondition condition={showMobileMenu}>
              <MobileMenu
                targetItems={targetItems}
                aboutItems={aboutItems}
                login={login}
                signup={signup}
                onKeyDown={(e: KeyboardEvent) => onMobileMenuKeyDown(e)}
                banner={{
                  bannerDefaultUrl: targetItems[0]?.megaMenu?.bannerDefaultUrl,
                  bannerAndroidUrl: targetItems[0]?.megaMenu?.bannerAndroidUrl,
                  bannerIosUrl: targetItems[0]?.megaMenu?.bannerIosUrl,
                  bannerText: targetItems[0]?.megaMenu?.bannerText,
                }}
              />
            </BlockRendererWithCondition>
          </StyledNavigation>
        </StyledHeaderContent>
      </StyledHeader>
    </Wrapper>
  )
}

const StyledHeader = styled.header<{
  $showMegaMenu: boolean
  $showMobileMenu: boolean
  $activeId: boolean
}>`
  ${({ theme, $showMegaMenu, $showMobileMenu, $activeId }) => css`
    position: relative;
    z-index: 100;
    background: ${$showMegaMenu || !$activeId ? theme.colors.white : '#ece6ff'};

    @media (width < ${theme.mediaQueries.mobile}) {
      background: transparent;
    }

    @media (width < ${theme.mediaQueries.largeDesktop}) {
      ${$showMobileMenu &&
      css`
        position: fixed;
        inset: 0;
        z-index: 100;
      `}
    }
  `}
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
    background: ${$showMegaMenu ? theme.colors.white : 'none'};

    > ul {
      background: ${$showMobileMenu ? theme.colors.lightBlue : 'none'};
      display: flex;
      align-items: center;
      gap: 1.5rem;
      padding: 2rem 2.5rem;
      height: 4rem;

      @media (width < ${theme.mediaQueries.largeDesktop}) {
        justify-content: space-between;
        gap: 0.5rem;
        padding: 1.75rem 1.5rem 1rem 1.5rem;
      }

      /* Only show logo + burger menu on mobile */
      li:not(:first-child, :last-child) {
        @media (width < ${theme.mediaQueries.largeDesktop}) {
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
    }
  `}
`

const StyledSignupItem = styled.li`
  position: relative;
`

const StyledMobileMenuListItem = styled.li`
  ${({ theme }) => css`
    display: none;

    @media (width < ${theme.mediaQueries.largeDesktop}) {
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
