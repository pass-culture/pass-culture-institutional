import React from 'react'
import styled, { css } from 'styled-components'

interface WhiteSpaceProps {
  space?: number
}

export function WhiteSpace(props: WhiteSpaceProps) {
  return <Root $height={props.space}></Root>
}

const Root = styled.div<{ $height?: number }>`
  ${({ $height }) => css`
    width: 100%;
    max-width: 90rem;
    min-height: ${$height ? `${$height / 10}rem` : '3rem'};
  `}
`
