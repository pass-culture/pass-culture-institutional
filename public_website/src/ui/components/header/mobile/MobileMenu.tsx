import React, { useEffect, useRef, useState } from 'react'
import styled, { css } from 'styled-components'

import { Button } from '../../button/Button'
import { ChevronRight } from '../../icons/ChevronRight'
import { HeaderProps } from '../Header'
import { MobileMenuListSubPanel } from './MobileMenuListSubPanel'
import { MobileMenuLoginSubPanel } from './MobileMenuLoginSubPanel'
import { MobileMenuSubPanel } from './MobileMenuSubPanel'

type MobileMenuProps = HeaderProps & {
  onKeyDown: (e: KeyboardEvent) => void
}

export function MobileMenu({
  onKeyDown,
  targetItems,
  aboutItems,
  login,
  signUp,
}: MobileMenuProps) {
  const navItems = [...targetItems, ...aboutItems]

  const [subPanelType, setSubPanelType] = useState<'login' | 'list' | null>(
    null
  )
  const [subPanelListIndex, setSubPanelListIndex] = useState<number | null>(
    null
  )

  function openSubPanel(type: 'login' | 'list', index?: number) {
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

    const navItem = navItems[subPanelListIndex!]

    return isLoginPanel ? (
      <MobileMenuSubPanel onClose={closeSubPanel} title={login.buttonLabel}>
        <MobileMenuLoginSubPanel loginItems={login.loginItems} />
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
          </StyledMobileMenuList>
          <StyledMobileMenuFooter>
            <li>
              <button onClick={() => openSubPanel('login')}>
                {login.buttonLabel}
              </button>
            </li>
            <li>
              <Button href={signUp.URL} target="_blank">
                {signUp.Label}
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
    background: ${theme.colors.white};
    position: fixed;
    top: 7rem;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: auto;
    display: flex;
    flex-direction: column;
    z-index: 2;
  `}
`

const StyledMobileMenuList = styled.ul<{ tabIndex: number }>`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 0 1.5rem 2.5rem;
`

const StyledMobileMenuListItem = styled.li`
  ${({ theme }) => css`
    font-size: ${theme.fonts.sizes.xl};
    font-weight: ${theme.fonts.weights.semiBold};

    &[aria-hidden] {
      background-color: ${theme.colors.black};
      opacity: 0.2;
      height: 1px;
      width: 4rem;
    }

    button {
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
    border-top: 1px solid rgb(0 0 0 / 0.12);
    margin-top: auto;

    li:first-child button {
      font-size: ${theme.fonts.sizes.xl};
      font-weight: ${theme.fonts.weights.semiBold};
    }
  `}
`
