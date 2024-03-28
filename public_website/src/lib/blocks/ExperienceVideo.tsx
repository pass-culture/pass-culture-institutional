import React from 'react'
import styled, { css } from 'styled-components'

import { ExperienceVideoCarousel } from './experienceVideoCarousel/experienceVideoCarousel'
import { ExperienceVideoCarouselSlideProps } from './experienceVideoCarousel/experieneVideoCarouselSlide'
type ExperienceVideoProps = {
  title: string
  controlsLabel: string
  nextButtonLabel: string
  previousButtonLabel: string
  videos: Omit<ExperienceVideoCarouselSlideProps, 'slideIndex'>[]
}

export function ExperienceVideo({
  title,
  controlsLabel,
  nextButtonLabel,
  previousButtonLabel,
  videos,
}: ExperienceVideoProps) {
  return (
    <Root>
      <StyledCarouselWrapper>
        <ExperienceVideoCarousel
          title={title}
          controlsLabel={controlsLabel}
          nextButtonLabel={nextButtonLabel}
          previousButtonLabel={previousButtonLabel}
          items={videos}
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
    padding: 0 7rem 0 7rem;

    @media (width < ${theme.mediaQueries.mobile}) {
      padding: 4rem 1.5rem 2rem;
    }
  `}
`
