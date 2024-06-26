import React from 'react'
import styled, { css } from 'styled-components'

import { SeparatorTextProps } from '@/types/props'
import { ContentWrapper } from '@/ui/components/ContentWrapper'

export function Separator(props: SeparatorTextProps) {
  const { isActive } = props

  return (
    <Root data-testid="separator" $noMargin>
      {isActive && <div />}
    </Root>
  )
}

const Root = styled(ContentWrapper)`
  ${({ theme }) => css`
    text-align: center;

    div {
      border-top: 1px solid ${theme.colors.gray};
      width: 100%;
    }
  `}
`
