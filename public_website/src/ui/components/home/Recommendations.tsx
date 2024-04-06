import React from 'react'
import styled, { css } from 'styled-components'

import { VerticalCarousel } from '../../../lib/blocks/verticalCarousel/VerticalCarousel'
import { Button } from '../button/Button'
import { VerticalCarouselSlideProps } from '@/lib/blocks/verticalCarousel/VerticalCarouselSlide'
import { Offer } from '@/types/playlist'
import { getOfferUrl } from '@/utils/apiHelpers'

type RecommendationsProps = {
  title: string
  recommendations: Offer[]
  cta: { Label: string; URL: string }
}

export function Recommendations({
  title,
  recommendations,
  cta,
}: RecommendationsProps) {
  const verticalCarouselItems: Omit<
    VerticalCarouselSlideProps,
    'slideIndex'
  >[] = recommendations.map((r) => ({
    description: r.venue.commonName,
    image: r.image?.url ?? null,
    title: r.name,
    url: getOfferUrl(r.id),
  }))

  return (
    <Root>
      <StyledCarouselWrapper>
        <VerticalCarousel title={title} items={verticalCarouselItems} />
      </StyledCarouselWrapper>
      <StyledCtaWrapper>
        <Button href={cta.URL}>{cta.Label}</Button>
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
    justify-content: center;
    align-items: end;
    @media (width < ${theme.mediaQueries.mobile}) {
      display: block;
      background-color: transparent;
      padding: 0;
    }
  `}
`

const StyledCarouselWrapper = styled.div`
  ${({ theme }) => css`
    width: 80%;
    @media (width < ${theme.mediaQueries.largeDesktop}) {
      max-width: 90%;
      width: 90%;
    }
    @media (width < ${theme.mediaQueries.mobile}) {
      width: auto;
      padding: 4rem 1.5rem 2rem;
    }
  `}
`

const StyledCtaWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 4rem;
`
