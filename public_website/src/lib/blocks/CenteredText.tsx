import React from 'react'
import styled, { css } from 'styled-components'

import { ContentWrapper } from '@/ui/components/ContentWrapper'
import { Typo } from '@/ui/components/typographies'

interface CenteredTextProps {
  title?: string
  description: string
}

export function CenteredText(props: CenteredTextProps) {
  return (
    <Root data-testid="centered-text">
      {props.title && (
        <Typo.Heading2
          as="h2"
          dangerouslySetInnerHTML={{ __html: props.title }}
        />
      )}
      <p dangerouslySetInnerHTML={{ __html: props.description }} />
    </Root>
  )
}

const Root = styled(ContentWrapper)`
  ${({ theme }) => css`
    text-align: center;
    --container-width: 52.5rem;

    ${Typo.Heading2} {
      margin-bottom: 1.5rem;
    }

    p {
      font-size: ${theme.fonts.sizes['4xl']};
      font-weight: ${theme.fonts.weights.semiBold};
      line-height: 2.75rem;

      @media (width < ${theme.mediaQueries.mobile}) {
        font-size: ${theme.fonts.sizes.xl};
      }
    }
  `}
`
