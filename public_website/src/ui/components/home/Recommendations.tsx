import React from 'react'
import styled, { css } from 'styled-components'

import { ButtonWithCTA } from '../buttonWithCTA/ButtonWithCTA'
import { VerticalCarousel } from '@/lib/blocks/verticalCarousel/VerticalCarousel'
import { RecommendationsProps, VerticalCarouselSlideProps } from '@/types/props'
import { getOfferUrl } from '@/utils/apiHelpers'

export function Recommendations(props: RecommendationsProps) {
  const { title, recommendations, cta } = props
  const verticalCarouselItems: Omit<
    VerticalCarouselSlideProps,
    'slideIndex'
  >[] = recommendations.map((recommendation) => ({
    description: recommendation.venue.commonName,
    image: recommendation.image?.url ?? null,
    title: recommendation.name,
    url: getOfferUrl(recommendation.id),
  }))

  return (
    <Root>
      <VerticalCarousel
        title={title}
        items={verticalCarouselItems}
        hidePlayIcon
      />
      <StyledCtaWrapper>
        <ButtonWithCTA cta={cta} />
      </StyledCtaWrapper>
    </Root>
  )
}

const Root = styled.div``

const StyledCtaWrapper = styled.div`
  ${({ theme }) => css`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 4rem;

    @media (width < ${theme.mediaQueries.mobile}) {
      margin-top: 2rem;
    }
  `}
`
