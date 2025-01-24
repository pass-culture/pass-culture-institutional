import React from 'react'
import styled, { css } from 'styled-components'

import { ButtonWithCTA } from '../buttonWithCTA/ButtonWithCTA'
import {
  ComponentCommonLinkFragment,
  UploadFileFragment,
} from '@/generated/graphql'
import { VerticalCarousel } from '@/lib/blocks/verticalCarousel/VerticalCarousel'
import { Offer } from '@/types/playlist'
import { getOfferUrl } from '@/utils/apiHelpers'

type RecommendationsProps = {
  requiredTitle: string
  cta: ComponentCommonLinkFragment
  recommendations: Offer[]
}

export function Recommendations(props: RecommendationsProps) {
  const { requiredTitle, recommendations, cta } = props
  const verticalCarouselItems = recommendations.map((recommendation) => ({
    id: recommendation.id.toString(),
    description: recommendation.venue.commonName,
    image: { url: recommendation.image?.url ?? null } as UploadFileFragment,
    title: recommendation.name,
    url: getOfferUrl(recommendation.id),
  }))

  return (
    <Root>
      <VerticalCarousel
        id={`${requiredTitle}-${recommendations.length}`}
        requiredTitle={requiredTitle}
        verticalCarouselItems={verticalCarouselItems}
        hidePlayIcon>
        <StyledCtaWrapper>
          <ButtonWithCTA cta={cta} />
        </StyledCtaWrapper>
      </VerticalCarousel>
    </Root>
  )
}

const Root = styled.div``

const StyledCtaWrapper = styled.div`
  ${({ theme }) => css`
    width: 100%;
    display: flex;
    justify-content: center;
    padding-top: 4rem;
    padding-bottom: 4rem;

    @media (width < ${theme.mediaQueries.mobile}) {
      padding-top: 2rem;
      padding-bottom: 2rem;
    }
  `}
`
