import React from 'react'
import styled, { css } from 'styled-components'

import { ArrowRight } from '../icons/ArrowRight'
import { OutlinedText } from '../OutlinedText'
import { onClickAnalytics } from '@/lib/analytics/helpers'
import { AccountItemDropdownProps } from '@/types/props'
import { Link } from '@/ui/components/Link'

export function AccountItem(props: AccountItemDropdownProps) {
  const { color, url, emoji, label, eventName, eventOrigin } = props
  return (
    <StyledAccountItem>
      <Link
        href={url}
        onClick={(): void => onClickAnalytics({ eventName, eventOrigin })}>
        <StyledEmoji $color={color}>
          <OutlinedText shadow>{emoji}</OutlinedText>
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
      &:hover {
        color: ${theme.colors.primary};
      }
      p {
        font-weight: ${theme.fonts.weights.semiBold};
        font-size: ${theme.fonts.sizes.l};
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
