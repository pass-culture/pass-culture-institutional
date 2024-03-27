import React from 'react'
import { Slide } from 'pure-react-carousel'
import styled, { css } from 'styled-components'

import { Typo } from '../../../ui/components/typographies'

export type KeyNumberCarouselSlideProps = {
  slideIndex: number
  title: string
  description: string
  firstEmoji: string
  secondEmoji: string
  thirdEmoji: string
}

export function KeyNumberCarouselSlide({
  slideIndex,
  title,
  description,
  firstEmoji,
  secondEmoji,
  thirdEmoji,
}: KeyNumberCarouselSlideProps) {
  return (
    <Root
      index={slideIndex}
      key={title}
      innerClassName="inner"
      aria-roledescription="diapositive">
      <StyledWrapper>
        <StyledIconWrapper>
          <p>{firstEmoji}</p>
          <p>{secondEmoji}</p>
          <p>{thirdEmoji}</p>
        </StyledIconWrapper>
        <StyledTextWrapper>
          <StyledTitle>{title}</StyledTitle>
          <Typo.Body>{description}</Typo.Body>
        </StyledTextWrapper>
      </StyledWrapper>
    </Root>
  )
}

const Root = styled(Slide)`
  ${({ theme }) => css`
    .inner {
      margin-right: 1rem;
      padding: 5rem 2rem;
      background-color: ${theme.colors.secondary}20;
      border-radius: 0.625rem;
      @media (max-width: ${theme.mediaQueries.mobile}) {
        margin-right: 0;
        margin-right: 1rem;
        margin-left: 1rem;
      }
    }
  `}
`

const StyledTitle = styled(Typo.Heading2)`
  margin: 1.5rem 0 0.25rem;
`

const StyledWrapper = styled.div`
  display: block;
  position: relative;
`

const StyledTextWrapper = styled.div`
  display: block;
  position: relative;
`

const StyledIconWrapper = styled.div`
  display: flex;
  position: relative;
  font-size: 5rem;
`
