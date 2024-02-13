import React from 'react'
import styled, { css } from 'styled-components'

import { LoginItemProps } from '../LoginDropdown'
import { LoginItem } from '../LoginItem'

type MobileMenuLoginSubPanelProps = {
  LoginItems: LoginItemProps[]
}

export function MobileMenuLoginSubPanel({
  LoginItems,
}: MobileMenuLoginSubPanelProps) {
  return (
    <StyledSubPanelLoginItems>
      {LoginItems.map((item, i) => {
        return <LoginItem key={i} {...item} />
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
