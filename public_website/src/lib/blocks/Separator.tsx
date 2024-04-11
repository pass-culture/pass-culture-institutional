import React from 'react'
import styled, { css } from 'styled-components'

import { ContentWrapper } from '@/ui/components/ContentWrapper'

interface SeparatorTextProps {
  isActive: boolean | undefined
}

export function Separator(props: SeparatorTextProps) {
  return (
    <Root data-testid="separator" $noMargin>
      {props.isActive && <div />}
    </Root>
  )
}

const Root = styled(ContentWrapper)`
  ${({ theme }) => css`
    text-align: center;
    padding: 1.5rem;

    div {
      border-top: 1px solid ${theme.colors.gray};
      width: 100%;
    }
  `}
`
