import React from 'react'
import Link from 'next/link'
import styled, { css } from 'styled-components'

type ButtonProps = {
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  href: string
  target?: '_blank'
}

export function Button({
  children,
  variant = 'primary',
  href,
  target,
}: ButtonProps) {
  return (
    <StyledButton variant={variant} href={href} target={target}>
      {children}
    </StyledButton>
  )
}

const StyledButton = styled(Link)<{ variant?: 'primary' | 'secondary' }>`
  ${({ theme, variant }) => css`
    background: ${variant === 'secondary'
      ? 'transparent'
      : `linear-gradient(
      90deg,
      #EB0055 -11.18%,
      ${theme.colors.secondary} 64.8%
    )`};

    ${variant === 'secondary' && `border: 1px solid ${theme.colors.white};`}

    border-radius: 2rem;
    color: ${theme.colors.white};
    display: inline-block;
    font-size: ${theme.fonts.sizes.xs};
    font-weight: ${theme.fonts.weights.semiBold};
    padding: 1rem 2rem;
    text-align: center;
  `}
`
