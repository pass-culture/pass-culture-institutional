import React from 'react'
import Link from 'next/link'
import styled, { css } from 'styled-components'

import { ArrowRight } from '../icons/ArrowRight'
import { OutlinedText } from '../OutlinedText'

type AccountItemProps = {
  color: string
  url: string
  emoji: string
  label: string
}

export function AccountItem({ color, url, emoji, label }: AccountItemProps) {
  return (
    <StyledAccountItem>
      <Link href={url}>
        <StyledEmoji $color={color}>
          <OutlinedText dilationRadius={0} blurDeviation={1.5} shadow>
            {emoji}
          </OutlinedText>
        </StyledEmoji>
        <p>{label}</p>
        <ArrowRight />
      </Link>
    </StyledAccountItem>
  )
}

const StyledAccountItem = styled.li`
  ${({ theme }) => css`
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

const StyledEmoji = styled.div<{ $color: string }>`
  ${({ theme, $color }) => css`
    background-color: ${$color};
    height: 3.5rem;
    width: 3.5rem;
    border-radius: 0.625rem;
    display: flex;
    align-items: center;
    justify-content: center;

    span {
      font-size: ${theme.fonts.sizes['3xl']};
      transform: rotate(-6deg);
    }
  `}
`
