import React, { useEffect, useRef } from 'react'
import styled, { css } from 'styled-components'

import { LoginItemProps } from '../LoginDropdown'
import { LoginItem } from '../LoginItem'

type MobileMenuLoginSubPanelProps = {
  LoginItems: LoginItemProps[]
}

export function MobileMenuLoginSubPanel({
  LoginItems,
}: MobileMenuLoginSubPanelProps) {
  // Focus list on mount
  const loginListRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    loginListRef.current?.focus()
  })

  return (
    <StyledSubPanelLoginItems
      ref={loginListRef}
      tabIndex={0}
      aria-labelledby="sub-panel-title">
      {LoginItems.map((item) => {
        return <LoginItem key={item.Label} {...item} />
      })}
    </StyledSubPanelLoginItems>
  )
}

const StyledSubPanelLoginItems = styled.ul`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin-bottom: 3.5rem;

    li {
      font-size: ${theme.fonts.sizes.xl};
      font-weight: ${theme.fonts.weights.semiBold};
    }
  `}
`
