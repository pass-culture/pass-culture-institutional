import React from 'react'
import styled, { css } from 'styled-components'

import { VerticalCarousel } from '../../../lib/blocks/verticalCarousel/VerticalCarousel'
import { VerticalCarouselSlideProps } from '../../../lib/blocks/verticalCarousel/VerticalCarouselSlide'
import { Button } from '../button/Button'

type RecommendationsProps = {
  title: string
  controlsLabel: string
  nextButtonLabel: string
  previousButtonLabel: string
  recommendations: Omit<VerticalCarouselSlideProps, 'slideIndex'>[]
  cta: { Label: string; URL: string }
}

export function Recommendations({
  title,
  controlsLabel,
  nextButtonLabel,
  previousButtonLabel,
  recommendations,
  cta,
}: RecommendationsProps) {
  return (
    <Root>
      <StyledCarouselWrapper>
        <VerticalCarousel
          title={title}
          controlsLabel={controlsLabel}
          nextButtonLabel={nextButtonLabel}
          previousButtonLabel={previousButtonLabel}
          items={recommendations}
        />
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

    @media (width < ${theme.mediaQueries.mobile}) {
      background-color: transparent;
      padding: 0;
    }
  `}
`

const StyledCarouselWrapper = styled.div`
  ${({ theme }) => css`
    padding: 0 0 0 7rem;

    @media (width < ${theme.mediaQueries.mobile}) {
      padding: 4rem 1.5rem 2rem;
    }
  `}
`

const StyledCtaWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 4rem;
`
