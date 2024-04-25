import React from 'react'
import styled, { css } from 'styled-components'

import { ButtonWithCTA } from '../buttonWithCTA/ButtonWithCTA'
import { VerticalCarousel } from '@/lib/blocks/verticalCarousel/VerticalCarousel'
import { VerticalCarouselSlideProps } from '@/lib/blocks/verticalCarousel/VerticalCarouselSlide'
import { CTA } from '@/types/CTA'
import { Offer } from '@/types/playlist'
import { getOfferUrl } from '@/utils/apiHelpers'

type RecommendationsProps = {
  title: string
  recommendations: Offer[]
  cta: CTA
}

export function Recommendations({
  title,
  recommendations,
  cta,
}: RecommendationsProps) {
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
      <VerticalCarousel title={title} items={verticalCarouselItems} />
      <StyledCtaWrapper>
        <ButtonWithCTA cta={cta} />
      </StyledCtaWrapper>
    </Root>
  )
}

const Root = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.lightBlue};
    padding: 6.25rem 0 5rem;

    display: flex;
    flex-direction: column;

    --module-spacing: none;

    @media (width < ${theme.mediaQueries.mobile}) {
      display: block;
      padding: 0;
      padding: 2.5rem 0 3.5rem;
    }
  `}
`

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
