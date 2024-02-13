import React from 'react'
import styled, { css } from 'styled-components'

import { Button } from '../button/Button'
import { HeaderProps } from './Header'

export function MobileMenu({
  TargetItems,
  AboutItems,
  LoginDropdown,
  SignUp,
}: HeaderProps) {
  const navItems = [...TargetItems, ...AboutItems]

  return (
    <StyledMobileMenuWrapper>
      <StyledMobileMenuList>
        {navItems.map((item, i) => {
          return (
            <React.Fragment key={item.Label}>
              <StyledMobileMenuListItem>
                <button>{item.Label}</button>
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
          <button>{LoginDropdown.ButtonLabel}</button>
        </li>
        <li>
          <Button href={SignUp.URL} target="_blank">
            {SignUp.Label}
          </Button>
        </li>
      </StyledMobileMenuFooter>
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
  `}
`

const StyledMobileMenuList = styled.ul`
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
        background-color: #94008c;
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

    li:first-child button {
      font-size: ${theme.fonts.sizes.xl};
      font-weight: ${theme.fonts.weights.semiBold};
    }
  `}
`
