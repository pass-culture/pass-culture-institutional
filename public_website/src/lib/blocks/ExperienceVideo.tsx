import React from 'react'
import styled, { css } from 'styled-components'

import { TestimonyCarouselSlideProps } from './testimonyCaousel/testimonyCarouselSlide'
import { TestimonyCarousel } from './testimonyCaousel/testimonyCarousel'

import { ExperienceVideoCarouselSlideProps } from './experienceVideoCarousel/experieneVideoCarouselSlide'
import { ExperienceVideoCarousel } from './experienceVideoCarousel/experienceVideoCarousel'
type ExperienceVideoProps = {
  title: string
  controlsLabel: string
  nextButtonLabel: string
  previousButtonLabel: string
  recommendations: Omit<ExperienceVideoCarouselSlideProps, 'slideIndex'>[]
  cta: { Label: string; URL: string }
}

export function ExperienceVideo({
  title,
  controlsLabel,
  nextButtonLabel,
  previousButtonLabel,
  recommendations,
  cta,
}: ExperienceVideoProps) {
  return (
    <Root>
      <StyledCarouselWrapper>
        <ExperienceVideoCarousel
          title={title}
          controlsLabel={controlsLabel}
          nextButtonLabel={nextButtonLabel}
          previousButtonLabel={previousButtonLabel}
          items={recommendations}
        />
      </StyledCarouselWrapper>
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
