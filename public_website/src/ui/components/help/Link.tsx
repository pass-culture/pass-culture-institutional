import React from 'react'
import styled, { css } from 'styled-components'

import { Link } from '../Link'

type LinkFaqProps = {
  href: string
  text: string
  target?: string
}

export function LinkFaq({ href, target, text }: LinkFaqProps) {
  const isTarget = (): boolean => target === '_blank'

  return (
    <StyledButton href={href} target={target}>
      {isTarget() && <span className="visually-hidden">Publié le</span>}
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
    text-align: center;
    width: max-content;
  `}
`
