import React, { useEffect, useRef, useState } from 'react'
import styled, { css } from 'styled-components'

import { Button } from '../../button/Button'
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

  const mainNavigationRef = useRef(null)

  function closeSubPanel() {
    setSubPanelType(null)
    setSubPanelListIndex(null)

    setTimeout(() => {
      // TODO: fix type
      mainNavigationRef.current?.focus()
    }, 1)
  }

  function getMobileMenuSubPanelContent() {
    const isLoginPanel = subPanelType === 'login'

    // TODO: fix types
    return (
      <MobileMenuSubPanel
        onClose={closeSubPanel}
        title={
          isLoginPanel
            ? Login.ButtonLabel
            : typeof subPanelListIndex === 'number'
            ? navItems[subPanelListIndex]?.Label
            : 'pouet'
        }>
        {isLoginPanel ? (
          <MobileMenuLoginSubPanel LoginItems={Login.Items} />
        ) : typeof subPanelListIndex === 'number' ? (
          <MobileMenuListSubPanel
            PrimaryList={navItems[subPanelListIndex]?.MegaMenu.PrimaryListItems}
            SecondaryList={
              navItems[subPanelListIndex]?.MegaMenu.SecondaryListItems
            }
            CardTitle={navItems[subPanelListIndex]?.MegaMenu.CardTitle}
            CardDescription={
              navItems[subPanelListIndex]?.MegaMenu.CardDescription
            }
            CardLink={navItems[subPanelListIndex]?.MegaMenu.CardLink}
          />
        ) : (
          'pouet'
        )}
      </MobileMenuSubPanel>
    )
  }

  const mobileMenuRef = useRef(null)
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
      position: relative;

      &::before,
      &::after {
        content: '';
        position: absolute;
        right: -1.5rem;
        top: 50%;
        width: 0.625rem;
        height: 2px;
        border-radius: 1px;
        background-color: ${theme.colors.primary};
        transform-origin: right;
      }

      &::before {
        transform: rotate(45deg) translateY(1px);
      }

      &::after {
        transform: rotate(-45deg) translateY(-1px);
      }
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
