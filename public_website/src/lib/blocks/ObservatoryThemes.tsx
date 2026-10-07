import React from 'react'
import { BlocksContent, BlocksRenderer } from '@strapi/blocks-react-renderer'
import styled, { css } from 'styled-components'

import BlockRendererWithCondition from '../BlockRendererWithCondition'
import type { ItemsTheme } from '@/theme/style'
import { ObservatoryThemesProps } from '@/types/props'
import { ButtonWithCTA } from '@/ui/components/buttonWithCTA/ButtonWithCTA'
import { ContentWrapper } from '@/ui/components/ContentWrapper'
import { ObservatoryThemeCard } from '@/ui/components/observatory-theme-card/ObservatoryThemeCard'
import StyledBlocksRenderer from '@/ui/components/StyledBlocksRenderer'
import { Typo } from '@/ui/components/typographies'
import { getStrapiURL } from '@/utils/apiHelpers'
import { isBlocksContentEmpty } from '@/utils/isBlocksContentEmpty'
import { isRenderable } from '@/utils/isRenderable'

const MAX_CARDS_PER_ROW = 3

/**
 * Cards are laid out on a 6-column grid, each one spanning 2 columns.
 * Rows with fewer cards are centered, and 4 cards are displayed as 2 × 2
 * to avoid a lonely card on the second row.
 */
const getGridColumn = (index: number, total: number): string => {
  const cardsPerRow = total === 4 ? 2 : MAX_CARDS_PER_ROW
  const rowStartIndex = Math.floor(index / cardsPerRow) * cardsPerRow
  const cardsInRow = Math.min(cardsPerRow, total - rowStartIndex)
  const offset = MAX_CARDS_PER_ROW - cardsInRow
  const start = offset + (index - rowStartIndex) * 2 + 1
  return `${start} / span 2`
}

export function ObservatoryThemes(props: ObservatoryThemesProps) {
  const { title, description, cta, themes } = props
  const items = themes?.data ?? []

  return (
    <Root>
      <StyledHeading>{title}</StyledHeading>

      <BlockRendererWithCondition
        condition={!isBlocksContentEmpty(description)}>
        <StyledDescription>
          <BlocksRenderer content={description as BlocksContent} />
        </StyledDescription>
      </BlockRendererWithCondition>

      <StyledList>
        {items.map(({ id, attributes }, index) => {
          const imageUrl = attributes.image?.data?.attributes?.url

          return (
            <li
              key={id}
              style={{ gridColumn: getGridColumn(index, items.length) }}>
              <ObservatoryThemeCard
                name={attributes.name}
                color={attributes.color as ItemsTheme | undefined}
                imageUrl={imageUrl ? getStrapiURL(imageUrl) : undefined}
                firstIcon={attributes.firstIcon}
                secondIcon={attributes.secondIcon}
                url={attributes.pageUrl}
              />
            </li>
          )
        })}
      </StyledList>

      {cta && isRenderable(cta.URL) && (
        <StyledCtaWrapper>
          <ButtonWithCTA cta={cta} />
        </StyledCtaWrapper>
      )}
    </Root>
  )
}

const Root = styled(ContentWrapper)`
  display: flex;
  flex-direction: column;
`

const StyledHeading = styled(Typo.Heading2)`
  ${({ theme }) => css`
    margin-bottom: 1.5rem;

    @media (width < ${theme.mediaQueries.mobile}) {
      margin-bottom: 1rem;
    }
  `}
`

const StyledDescription = styled(StyledBlocksRenderer)`
  margin-bottom: 1rem;
`

const StyledList = styled.ul`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 1.5rem;
    margin-top: 2rem;

    /* Horizontal swipe on mobile, with a peek at the next card */
    @media (width < ${theme.mediaQueries.mobile}) {
      display: flex;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      scrollbar-width: none;
      gap: 1rem;
      margin-top: 1rem;

      > li {
        flex: 0 0 80%;
        scroll-snap-align: start;
      }
    }
  `}
`

const StyledCtaWrapper = styled.div`
  align-self: center;
  margin-top: 3rem;
`
