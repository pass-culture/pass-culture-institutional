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
  TargetItems,
  AboutItems,
  Login,
  SignUp,
}: MobileMenuProps) {
  const navItems = [...TargetItems, ...AboutItems]

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
      <MobileMenuSubPanel onClose={closeSubPanel} title={Login.ButtonLabel}>
        <MobileMenuLoginSubPanel LoginItems={Login.LoginItems} />
      </MobileMenuSubPanel>
    ) : (
      navItem && (
        <MobileMenuSubPanel
          onClose={closeSubPanel}
          title={isLoginPanel ? Login.ButtonLabel : navItem.Label}>
          <MobileMenuListSubPanel
            PrimaryList={navItem.MegaMenu.PrimaryListItems}
            SecondaryList={navItem.MegaMenu.SecondaryListItems}
            CardTitle={navItem.MegaMenu.CardTitle}
            CardDescription={navItem.MegaMenu.CardDescription}
            CardLink={navItem.MegaMenu.CardLink}
            CardFirstEmoji={navItem.MegaMenu.CardFirstEmoji}
            CardSecondEmoji={navItem.MegaMenu.CardSecondEmoji}
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
                <React.Fragment key={item.Label}>
                  <StyledMobileMenuListItem>
                    <button onClick={() => openSubPanel('list', i)}>
                      {item.Label}
                      <ChevronRight />
                    </button>
                  </StyledMobileMenuListItem>
                  {i === TargetItems.length - 1 && (
                    <StyledMobileMenuListItem aria-hidden="true" />
                  )}
                </React.Fragment>
              )
            })}
          </StyledMobileMenuList>
          <StyledMobileMenuFooter>
            <li>
              <button onClick={() => openSubPanel('login')}>
                {Login.ButtonLabel}
              </button>
            </li>
            <li>
              <Button href={SignUp.URL} target="_blank">
                {SignUp.Label}
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
