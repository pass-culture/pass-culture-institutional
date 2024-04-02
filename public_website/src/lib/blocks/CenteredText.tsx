import React from 'react'
import styled, { css } from 'styled-components'

import { Typo } from '@/ui/components/typographies'

interface CenteredTextProps {
  title: string
  description: string
}

export function CenteredText(props: CenteredTextProps) {
  return (
    <Root data-testid="centered-text">
      <Typo.Heading3
        as="h2"
        dangerouslySetInnerHTML={{ __html: props.title }}></Typo.Heading3>
      <p dangerouslySetInnerHTML={{ __html: props.description }} />
    </Root>
  )
}

const Root = styled.div`
  ${({ theme }) => css`
    text-align: center;
    max-width: 52.5rem;
    margin: 0 auto;
    padding: 1.5rem;

    ${Typo.Heading3} {
      margin-bottom: 1.5rem;
      color: ${theme.colors.secondary};
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
