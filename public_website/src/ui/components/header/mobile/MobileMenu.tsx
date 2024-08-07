import React, { useEffect, useRef, useState } from 'react'
import styled, { css } from 'styled-components'

import { Button } from '../../button/Button'
import { ChevronRight } from '../../icons/ChevronRight'
import HeaderBanner from '../HeaderBanner'
import { MobileMenuAccountSubPanel } from './MobileMenuAccountSubPanel'
import { MobileMenuListSubPanel } from './MobileMenuListSubPanel'
import { MobileMenuSubPanel } from './MobileMenuSubPanel'
import { BannerProps, HeaderMenuProps } from '@/types/props'

type MobileMenuProps = HeaderMenuProps & {
  onKeyDown: (e: KeyboardEvent) => void
}

export function MobileMenu({
  onKeyDown,
  targetItems,
  aboutItems,
  login,
  signup,
  banner,
}: MobileMenuProps & { banner: BannerProps }) {
  const navItems = [...targetItems, ...aboutItems]

  const [subPanelType, setSubPanelType] = useState<
    'login' | 'signup' | 'list' | null
  >(null)
  const [subPanelListIndex, setSubPanelListIndex] = useState<number | null>(
    null
  )

  function openSubPanel(type: 'login' | 'signup' | 'list', index?: number) {
    setSubPanelType(type)

    if (typeof index === 'number') {
      setSubPanelListIndex(index)
    }
  }

  // Close sub panel and focus main navigation list
  const mainNavigationRef = useRef<HTMLUListElement>(null)

  function closeSubPanel() {
    setSubPanelType(null)
    setSubPanelListIndex(null)

    setTimeout(() => {
      mainNavigationRef.current?.focus()
    }, 1)
  }

  // Either display login or list sub panel mobile menu
  function getMobileMenuSubPanelContent() {
    const isLoginPanel = subPanelType === 'login'
    const isSignupPanel = subPanelType === 'signup'

    const navItem = navItems[subPanelListIndex!]

    return isLoginPanel || isSignupPanel ? (
      <MobileMenuSubPanel
        onClose={closeSubPanel}
        title={isLoginPanel ? login.buttonLabel : signup.buttonLabel}>
        <MobileMenuAccountSubPanel
          items={isLoginPanel ? login.items : signup.items}
        />
      </MobileMenuSubPanel>
    ) : (
      navItem && (
        <MobileMenuSubPanel
          onClose={closeSubPanel}
          title={isLoginPanel ? login.buttonLabel : navItem.label}>
          <MobileMenuListSubPanel
            primaryList={navItem.megaMenu.primaryListItems}
            secondaryList={navItem.megaMenu.secondaryListItems}
            cardTitle={navItem.megaMenu.cardTitle}
            cardDescription={navItem.megaMenu.cardDescription}
            cardLink={navItem.megaMenu.cardLink}
            cardFirstEmoji={navItem.megaMenu.cardFirstEmoji}
            cardSecondEmoji={navItem.megaMenu.cardSecondEmoji}
            theme={navItem.megaMenu.theme}
          />
        </MobileMenuSubPanel>
      )
    )
  }

  // Handle escape keydown
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const mobileMenuElement = mobileMenuRef.current
    mobileMenuElement?.addEventListener('keydown', (e: KeyboardEvent) =>
      onKeyDown(e)
    )

    return () => {
      mobileMenuElement?.removeEventListener('keydown', (e: KeyboardEvent) =>
        onKeyDown(e)
      )
    }
  })

  return (
    <StyledMobileMenuWrapper ref={mobileMenuRef}>
      {subPanelType ? (
        getMobileMenuSubPanelContent()
      ) : (
        <React.Fragment>
          <StyledMobileMenuList
            ref={mainNavigationRef}
            tabIndex={0}
            aria-label="Menu principal"
            id="mobile-menu-main-navigation">
            {navItems.map((item, i) => {
              return (
                <React.Fragment key={item.label}>
                  <StyledMobileMenuListItem>
                    <button onClick={() => openSubPanel('list', i)}>
                      {item.label}
                      <ChevronRight />
                    </button>
                  </StyledMobileMenuListItem>
                  {i === targetItems.length - 1 && (
                    <StyledMobileMenuListItem aria-hidden="true" />
                  )}
                </React.Fragment>
              )
            })}
            <HeaderBanner
              bannerAndroidUrl={banner.bannerAndroidUrl}
              bannerDefaultUrl={banner.bannerDefaultUrl}
              bannerIosUrl={banner.bannerIosUrl}
              bannerText={banner.bannerText}
            />
          </StyledMobileMenuList>

          <StyledMobileMenuFooter>
            <li>
              <button onClick={() => openSubPanel('login')}>
                {login.buttonLabel}
              </button>
            </li>
            <li>
              <Button onClick={() => openSubPanel('signup')}>
                {signup.buttonLabel}
              </Button>
            </li>
          </StyledMobileMenuFooter>
        </React.Fragment>
      )}
    </StyledMobileMenuWrapper>
  )
}

const StyledMobileMenuWrapper = styled.div`
  ${({ theme }) => css`
    background: linear-gradient(
      to bottom,
      ${theme.colors.lightBlue},
      ${theme.colors.white}
    );
    position: fixed;
    inset: 6rem 0 0;
    overflow: auto;
    display: flex;
    flex-direction: column;
    z-index: 2;
  `}
`

const StyledMobileMenuList = styled.ul<{ tabIndex: number }>`
  display: flex;
  flex-direction: column;
  gap: 1.875rem;
  padding: 1rem 1.5rem 2.5rem;
`

const StyledMobileMenuListItem = styled.li`
  ${({ theme }) => css`
    font-size: ${theme.fonts.sizes.xl};
    font-weight: ${theme.fonts.weights.semiBold};

    &[aria-hidden] {
      background-color: ${theme.colors.black};
      opacity: 0.2;
      height: 0.0625rem;
      width: 4rem;
    }

    button {
      color: ${theme.colors.black};
      align-items: center;
      display: flex;
      gap: 1.5rem;
    }
  `}
`

const StyledMobileMenuFooter = styled.ul`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2.25rem;
    padding: 1rem 2rem;
    border-top: 0.0625rem solid rgb(0 0 0 / 0.12);
    margin-top: auto;

    li:first-child button {
      color: ${theme.colors.black};
      font-size: ${theme.fonts.sizes.xs};
      font-weight: ${theme.fonts.weights.semiBold};
    }
  `}
`
