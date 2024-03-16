import React, { ButtonHTMLAttributes, forwardRef, Ref } from 'react'
import Link from 'next/link'
import styled, { css } from 'styled-components'

import { theme } from '@/theme/theme'

type ButtonVariants = 'primary' | 'secondary' | 'tertiary' | 'quaternary'

type ButtonProps = {
  children: React.ReactNode
  variant?: ButtonVariants
  href?: string
  onClick?: () => void
  target?: '_blank'
  className?: string
} & ButtonHTMLAttributes<HTMLButtonElement>

export const Button = forwardRef(function Button(
  {
    children,
    variant = 'primary',
    href,
    onClick,
    target,
    className,
    ...other
  }: ButtonProps,
  ref: Ref<HTMLButtonElement>
) {
  return (
    <StyledButton
      {...other}
      ref={ref}
      as={href ? Link : 'button'}
      className={className}
      $variant={variant}
      href={href}
      onClick={onClick}
      target={target}>
      {children}
    </StyledButton>
  )
})

function getVariantButtonBackground(variant?: ButtonVariants) {
  switch (variant) {
    case 'secondary':
      return 'transparent'
    case 'tertiary':
      return theme.colors.white
    case 'quaternary':
      return 'transparent'
    default:
      return `linear-gradient(
        90deg,
        ${theme.colors.tertiary} -11.18%,
        ${theme.colors.secondary} 64.8%
      )`
  }
}

const StyledButton = styled.button<{ $variant?: ButtonVariants }>`
  ${({ theme, $variant }) => css`
    background: ${$variant
      ? getVariantButtonBackground($variant)
      : `linear-gradient(90deg, ${theme.colors.tertiary} -11.18%, ${theme.colors.secondary} 64.8%)`};

    ${$variant &&
    $variant !== 'primary' &&
    `border: 1px solid ${theme.colors.white};`}

    ${$variant &&
    $variant === 'quaternary' &&
    `border: 1px solid ${theme.colors.primary};`}


    border-radius: 2rem;
    color: ${$variant === 'tertiary'
      ? theme.colors.secondary
      : theme.colors.white};

    ${$variant &&
    $variant === 'quaternary' &&
    `color: ${theme.colors.primary};`}

    display: inline-block;

    font-size: ${theme.fonts.sizes.xs};
    font-weight: ${theme.fonts.weights.semiBold};
    padding: 1rem 2rem;
    text-align: center;
    width: max-content;

    ${($variant === 'secondary' || $variant === 'tertiary') &&
    `--outline-color: ${theme.colors.white};`}
  `}
`
