import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styled, { css } from 'styled-components'

import ArrowRight from '../../../../public/images/arrow-right.svg'

type LoginItemProps = {
  Color: string
  URL: string
  Emoji: string
  Label: string
}

export function LoginItem({ Color, URL, Emoji, Label }: LoginItemProps) {
  return (
    <StyledLoginItem $color={Color}>
      <Link href={URL}>
        <span>
          <span>{Emoji}</span>
        </span>
        <p>{Label}</p>
        <Image src={ArrowRight} alt="" />
      </Link>
    </StyledLoginItem>
  )
}

const StyledLoginItem = styled.li<{ $color: string }>`
  ${({ theme, $color }) => css`
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
        background-color: ${$color};
        height: 3.5rem;
        width: 3.5rem;
        border-radius: 0.625rem;
        display: flex;
        align-items: center;
        justify-content: center;

        span {
          font-size: ${theme.fonts.sizes['3xl']};
        }
      }

      p {
        font-weight: ${theme.fonts.weights.semiBold};
        font-size: ${theme.fonts.sizes.xl};
        flex-shrink: 0;
        max-width: 16ch;
      }
    }
  `}
`
