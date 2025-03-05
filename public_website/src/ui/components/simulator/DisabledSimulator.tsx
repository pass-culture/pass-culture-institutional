import React from 'react'
import styled, { css } from 'styled-components'

import { Typo } from '../typographies'

const SimulatorWrapper = styled.div`
  ${({ theme }) => css`
    background: white;
    border-radius: ${theme.radius.sm};
    padding: 2rem;
    box-shadow: ${theme.shadows.popover};
    text-align: center;
    max-width: 50rem;
    margin: 2rem auto;
    position: relative;
  `}
`

const Emoji = styled.span`
  ${({ theme }) => css`
    font-size: ${theme.fonts.sizes['6xl']};
    position: absolute;
    right: -10px;
    top: -10px;
    transform: rotate(15deg);
  `}
`

type DisabledSimulatorProps = {
  disableText: string
}
export default function DisabledSimulator({
  disableText,
}: DisabledSimulatorProps) {
  return (
    <SimulatorWrapper>
      <Emoji>✌️</Emoji>
      <Typo.Body>{disableText}</Typo.Body>
    </SimulatorWrapper>
  )
}
