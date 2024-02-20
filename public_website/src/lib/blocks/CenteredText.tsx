import React from 'react'
import styled, { css } from 'styled-components'

import { Typo } from '@/ui/components/typographies'

interface CenteredTextProps {
  Title: string
  Text: string
}

export function CenteredText(props: CenteredTextProps) {
  return (
    <Root data-testid="centered-text">
      <Typo.Heading2>{props.Title}</Typo.Heading2>
      <p dangerouslySetInnerHTML={{ __html: props.Text }} />
    </Root>
  )
}

const Root = styled.div`
  ${({ theme }) => css`
    text-align: center;
    max-width: 52.5rem;
    margin: 0 auto;
    padding: 1.5rem;

    h2 {
      margin-bottom: 1.5rem;
    }

    p {
      font-size: ${theme.fonts.sizes['4xl']};
      font-weight: ${theme.fonts.weights.semiBold};
      line-height: 1.7;

      @media (width < ${theme.mediaQueries.mobile}) {
        font-size: ${theme.fonts.sizes.xl};
      }
    }
  `}
`
