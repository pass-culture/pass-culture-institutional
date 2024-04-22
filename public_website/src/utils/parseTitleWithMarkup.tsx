import React from 'react'
import styled, { css } from 'styled-components'

export const parseTitleWithMarkup = (
  text: string
): { textWithMarkup: JSX.Element[]; accessibilityLabel: string } => {
  const parts = text.split(/\*\*/)
  const accessibilityLabel = parts.join('')

  const textWithMarkup = parts.map((part, index) => {
    if (index % 2 === 1) {
      return <HighlightedMark key={index}>{part}</HighlightedMark>
    } else {
      return <span key={index}>{part}</span>
    }
  })

  return { textWithMarkup, accessibilityLabel }
}

const HighlightedMark = styled.mark`
  ${({ theme }) => css`
    background: none;
    background-image: linear-gradient(
      to right,
      ${theme.colors.flashGreen} 50%,
      ${theme.colors.flashGreen} 50%
    );
    background-size: 200% 0.4em;
    background-position: 100% 90%;
    background-repeat: no-repeat;
    color: inherit;
  `}
`
