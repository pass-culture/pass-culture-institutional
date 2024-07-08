import React from 'react'
import styled, { css } from 'styled-components'

import { ContentWrapper } from '@/ui/components/ContentWrapper'
import { Typo } from '@/ui/components/typographies'
import { parseText } from '@/utils/parseText'

interface CenteredTextProps {
  title?: string
  description: string
}

export function CenteredText(props: CenteredTextProps) {
  const { title, description } = props
  return (
    <Root data-testid="centered-text">
      {title && <Typo.Heading2>{title}</Typo.Heading2>}
      {description && (
        <p aria-label={parseText(description).accessibilityLabel}>
          {parseText(description).processedText}
        </p>
      )}
    </Root>
  )
}

const Root = styled(ContentWrapper)`
  ${({ theme }) => css`
    text-align: center;
    --container-width: 52.5rem;

    h2 {
      margin-bottom: 1.5rem;
    }

    p {
      font-size: ${theme.fonts.sizes['4xl']};
      font-weight: ${theme.fonts.weights.semiBold};
      line-height: 2.75rem;

      @media (width < ${theme.mediaQueries.mobile}) {
        font-size: ${theme.fonts.sizes.xl};
        line-height: 1.75rem;
      }
    }
  `}
`
