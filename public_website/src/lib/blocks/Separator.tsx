import React from 'react'
import styled, { css } from 'styled-components'

interface SeparatorTextProps {
  isActive: boolean | undefined
}

export function Separator(props: SeparatorTextProps) {
  return <Root data-testid="separator">{props.isActive && <div></div>}</Root>
}

const Root = styled.div`
  ${({ theme }) => css`
    text-align: center;
    max-width: 80%;
    margin: 0 auto;
    padding: 1.5rem;

    div {
      border-top: 1px solid ${theme.colors.gray};
      margin: 0 auto;
      width: 100%;
    }
  `}
`
