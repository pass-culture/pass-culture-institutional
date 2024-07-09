import React from 'react'
import styled, { css } from 'styled-components'

import BlockRendererWithCondition from '../BlockRendererWithCondition'
import { BaseTextWithOptionTitleProps } from '@/types/props'
import { ContentWrapper } from '@/ui/components/ContentWrapper'
import { Typo } from '@/ui/components/typographies'
import { isRenderable } from '@/utils/isRenderable'
import { parseText } from '@/utils/parseText'

export function CenteredText(props: BaseTextWithOptionTitleProps) {
  const { title, description } = props
  return (
    <Root data-testid="centered-text">
      <BlockRendererWithCondition condition={isRenderable(title)}>
        <Typo.Heading2>{title as string}</Typo.Heading2>
      </BlockRendererWithCondition>
      <p aria-label={parseText(description).accessibilityLabel}>
        {parseText(description).processedText}
      </p>
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
