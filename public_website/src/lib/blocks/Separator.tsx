import React from 'react'
import styled, { css } from 'styled-components'

import { SeparatorTextProps } from '@/types/props'

export function Separator(props: SeparatorTextProps) {
  const { isActive } = props

  return (
    <Root aria-hidden="true" data-testid="separator">
      {!!isActive && <div />}
    </Root>
  )
}

const Root = styled.div`
  ${({ theme }) => css`
    text-align: center;
    width: 100%;
    border-top: 1px solid ${theme.colors.white};
    div {
      border-top: 1px solid ${theme.colors.gray};
    }
  `}
`
