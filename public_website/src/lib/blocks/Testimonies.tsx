import React from 'react'
import styled, { css } from 'styled-components'

import { TestimonyCarousel } from './testimonyCaousel/testimonyCarousel'
import { TestimonyCarouselSlideProps } from './testimonyCaousel/testimonyCarouselSlide'

type TestimoniesProps = {
  title: string
  controlsLabel: string
  nextButtonLabel: string
  previousButtonLabel: string
  testimonies: Omit<TestimonyCarouselSlideProps, 'slideIndex'>[]
}

export function Testimonies({
  title,
  controlsLabel,
  nextButtonLabel,
  previousButtonLabel,
  testimonies,
}: TestimoniesProps) {
  return (
    <Root>
      <TestimonyCarousel
        title={title}
        controlsLabel={controlsLabel}
        nextButtonLabel={nextButtonLabel}
        previousButtonLabel={previousButtonLabel}
        items={testimonies}
      />
    </Root>
  )
}

const Root = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.lightBlue};
    padding: 6.25rem 0 7rem;

    @media (width < ${theme.mediaQueries.mobile}) {
      background-color: transparent;
      padding: 4rem 1.5rem 2rem;
    }
  `}
`
