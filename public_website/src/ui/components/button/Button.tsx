import React from 'react'
import Link from 'next/link'
import styled, { css } from 'styled-components'

type ButtonProps = {
  children: React.ReactNode
  href: string
  target?: '_blank'
}

export function Button({ children, href, target }: ButtonProps) {
  return (
    <StyledButton href={href} target={target}>
      {children}
    </StyledButton>
  )
}

const StyledButton = styled(Link)`
  ${({ theme }) => css`
    background: linear-gradient(
      90deg,
      ${theme.colors.primary} -11.18%,
      ${theme.colors.secondary} 64.8%
    );
    border-radius: 2rem;
    color: ${theme.colors.white};
    display: inline-block;
    font-size: ${theme.fonts.sizes.xs};
    font-weight: ${theme.fonts.weights.semiBold};
    padding: 1rem 2rem;
    text-align: center;
  `}
`
