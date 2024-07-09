import React from 'react'
import styled, { css } from 'styled-components'

import { WhiteSpaceProps } from '@/types/props'

export function WhiteSpace(props: WhiteSpaceProps) {
  const { space } = props
  return <Spacer $height={space}></Spacer>
}

const Spacer = styled.div<{ $height?: number }>`
  ${({ $height }) => css`
    width: 100%;
    max-width: 90rem;
    min-height: ${$height ? `${$height / 10}rem` : '3rem'};
  `}
`
