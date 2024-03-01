import React from 'react'
import Link from 'next/link'
import styled, { css } from 'styled-components'

import { ArrowRight } from '../icons/ArrowRight'

type AccountItemProps = {
  color: string
  url: string
  emoji: string
  label: string
}

export function AccountItem({ color, url, emoji, label }: AccountItemProps) {
  return (
    <StyledAccountItem color={color}>
      <Link href={url}>
        <span>{emoji}</span>
        <p>{label}</p>
        <ArrowRight />
      </Link>
    </StyledAccountItem>
  )
}

const StyledAccountItem = styled.li<{ color: string }>`
  ${({ theme, color }) => css`
    &[aria-hidden] {
      background-color: ${theme.colors.black};
      opacity: 0.2;
      height: 1px;
      width: 100%;
    }

    a {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1.875rem;

      > span {
        background-color: ${color};
        height: 3.5rem;
        width: 3.5rem;
        border-radius: 0.625rem;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: ${theme.fonts.sizes['3xl']};
      }

      p {
        font-weight: ${theme.fonts.weights.semiBold};
        font-size: ${theme.fonts.sizes.xl};
        flex-shrink: 0;
        max-width: 16ch;
      }

      @media (width < ${theme.mediaQueries.tablet}) {
        justify-content: start;
      }
    }
  `}
`
