import React from 'react'
import Link from 'next/link'
import styled, { css } from 'styled-components'

import { theme } from '@/theme/theme'

type ButtonVariants = 'primary' | 'secondary' | 'tertiary'

type ButtonProps = {
  children: React.ReactNode
  variant?: ButtonVariants
  href: string
  target?: '_blank'
  className?: string
}

export function Button({
  children,
  variant = 'primary',
  href,
  target,
  className,
}: ButtonProps) {
  return (
    <StyledButton
      className={className}
      variant={variant}
      href={href}
      target={target}>
      {children}
    </StyledButton>
  )
}

function getVariantButtonBackground(variant?: ButtonVariants) {
  switch (variant) {
    case 'secondary':
      return 'transparent'
    case 'tertiary':
      return theme.colors.white
    default:
      return `linear-gradient(
        90deg,
        #EB0055 -11.18%,
        ${theme.colors.secondary} 64.8%
      )`
  }
}

const StyledButton = styled(Link)<{ variant?: ButtonVariants }>`
  ${({ theme, variant }) => css`
    background: ${variant
      ? getVariantButtonBackground(variant)
      : `linear-gradient(90deg, #eb0055 -11.18%, ${theme.colors.secondary} 64.8%)`};

    ${variant &&
    variant !== 'primary' &&
    `border: 1px solid ${theme.colors.white};`}

    border-radius: 2rem;
    color: ${variant === 'tertiary'
      ? theme.colors.secondary
      : theme.colors.white};
    display: inline-block;
    font-size: ${theme.fonts.sizes.xs};
    font-weight: ${theme.fonts.weights.semiBold};
    padding: 1rem 2rem;
    text-align: center;
    width: max-content;
  `}
`
