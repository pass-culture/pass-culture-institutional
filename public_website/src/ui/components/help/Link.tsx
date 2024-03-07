import React from 'react'
import Link from 'next/link'
import styled, { css } from 'styled-components'

type ButtonProps = {
  href: string
  target?: '_blank'
  text: string
}

export function LinkFaq({ href, target, text }: ButtonProps) {
  return (
    <StyledButton href={href} target={target}>
      {text}
    </StyledButton>
  )
}

const StyledButton = styled(Link)`
  ${({ theme }) => css`
    display: block;
    margin-top: 1rem;
    text-decoration: underline;
    font-size: ${theme.fonts.sizes.xs};
    font-weight: ${theme.fonts.weights.semiBold};
    color: ${theme.colors.primary};
    // padding: 1rem 2rem;
    text-align: center;
    width: max-content;
  `}
`
