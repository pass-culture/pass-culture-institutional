import React from 'react'
import styled, { css } from 'styled-components'

import { Link } from '../Link'

type SkipLinkProps = {
  label: string
  href: string
}

export function SkipLink({ label, href }: SkipLinkProps) {
  return (
    <StyledLink href={href} target="_parent">
      {label}
    </StyledLink>
  )
}

const StyledLink = styled(Link)`
  ${({ theme }) => css`
    background-color: ${theme.colors.primary};
    color: ${theme.colors.white};
    font-weight: ${theme.fonts.weights.medium};
    padding: 0.5rem;
    position: fixed;
    top: -100%;
    left: -100%;

    &:focus {
      top: 1rem;
      left: 1rem;
      z-index: 9999;
    }
  `}
`
