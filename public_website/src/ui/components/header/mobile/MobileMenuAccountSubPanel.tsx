import React, { useEffect, useRef } from 'react'
import styled, { css } from 'styled-components'

import { AccountItem } from '../AccountItem'
import { MobileMenuAccountSubPanelProps } from '@/types/props'

export function MobileMenuAccountSubPanel(
  props: MobileMenuAccountSubPanelProps
) {
  const { items } = props
  // Focus list on mount
  const accountListRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    accountListRef.current?.focus()
  })

  return (
    <StyledSubPanelAccountItems
      ref={accountListRef}
      tabIndex={0}
      aria-labelledby="sub-panel-title">
      {items.map((item) => {
        return <AccountItem key={item.label} {...item} />
      })}
    </StyledSubPanelAccountItems>
  )
}

const StyledSubPanelAccountItems = styled.ul`
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
