import React, { ButtonHTMLAttributes, forwardRef, Ref } from 'react'
import styled, { css } from 'styled-components'

import { theme } from '@/theme/theme'
import { Link } from '@/ui/components/Link'

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
      <InnerButton>{children}</InnerButton>
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
function getFocusOutlineColor(variant?: ButtonVariants) {
  switch (variant) {
    case 'secondary':
    case 'tertiary':
      return `outline: 2px solid${theme.colors.white}`
    default:
      return `outline: 2px solid ${theme.colors.primary}`
  }
}
function getHoverBackgroundColor(variant?: ButtonVariants) {
  switch (variant) {
    case 'secondary':
      return 'rgba(256, 256, 256, 0.2)'
    case 'tertiary':
      return `transparent`
    case 'quaternary':
      return 'rgba(50, 0, 150, 0.07)'
    default:
      return 'rgba(46, 5, 146, 0.7)'
  }
}
const StyledButton = styled.button<{ $variant?: ButtonVariants }>`
  ${({ theme, $variant }) => css`
    position: relative;
    cursor: pointer;
    background: ${$variant
      ? getVariantButtonBackground($variant)
      : `linear-gradient(90deg, ${theme.colors.tertiary} -11.18%, ${theme.colors.secondary} 64.8%)`};

    ${$variant &&
    $variant !== 'primary' &&
    `border: 1px solid ${theme.colors.white};`}

    ${$variant &&
    $variant === 'quaternary' &&
    `border: 1px solid ${theme.colors.purple};`}
    outline-offset: 2px;
    transition: all 0.4s ease-in-out;
    &:focus {
      ${$variant &&
      $variant === 'tertiary' &&
      `background:rgba(255,255,255,0);
        color:${theme.colors.white};`}
      ${$variant ? getFocusOutlineColor($variant) : ''}
    }
    &:hover {
      ${$variant &&
      $variant === 'tertiary' &&
      `background:rgba(255,255,255,0);
      color:${theme.colors.white};`}
      &::after {
        opacity: 1;
      }
    }

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      height: 100%;
      width: 100%;
      border-radius: 2rem;
      background: ${$variant
        ? getHoverBackgroundColor($variant)
        : 'transparent'};
      opacity: 0;
      z-index: 0;
      transition: opacity 0.4s ease-in-out;
      pointer-events: none;
    }
    border-radius: 2rem;
    color: ${$variant === 'tertiary'
      ? theme.colors.secondary
      : theme.colors.white};

    ${$variant && $variant === 'quaternary' && `color: ${theme.colors.purple};`}

    font-size: ${theme.fonts.sizes.xs};
    font-weight: ${theme.fonts.weights.medium};
    padding: 1rem 2rem;
    display: inline-block;
    text-align: center;
    width: max-content;
  `}
`

const InnerButton = styled.span`
  position: relative;
  z-index: 1;
`
