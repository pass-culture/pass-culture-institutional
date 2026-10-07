import React from 'react'
import styled from 'styled-components'

import BlockRendererWithCondition from '../BlockRendererWithCondition'
import { ListItems } from './ListItems'
import NoResult from './NoResult'
import { OBSERVATORY_PATHS } from '@/domain/pages/pages.path'
import { ObservatoryArticlesProps } from '@/types/props'
import { ContentWrapper } from '@/ui/components/ContentWrapper'
import { Typo } from '@/ui/components/typographies'
import { isRenderable } from '@/utils/isRenderable'

const DEFAULT_BUTTON_TEXT = 'Voir plus'

export function ObservatoryArticles(props: ObservatoryArticlesProps) {
  const { title, buttonText, articles = [] } = props

  return (
    <React.Fragment>
      <BlockRendererWithCondition condition={isRenderable(title)}>
        <ContentWrapper $noMargin>
          <Typo.Heading2>{title as string}</Typo.Heading2>
        </ContentWrapper>
      </BlockRendererWithCondition>

      {articles.length > 0 ? (
        <StyledListItems
          news={articles}
          type={OBSERVATORY_PATHS.ARTICLES}
          buttonText={buttonText || DEFAULT_BUTTON_TEXT}
        />
      ) : (
        <NoResult />
      )}
    </React.Fragment>
  )
}

const StyledListItems = styled(ListItems)`
  top: 0;
`
