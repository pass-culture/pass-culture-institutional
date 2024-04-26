import React from 'react'
import { Slide } from 'pure-react-carousel'
import styled, { css } from 'styled-components'

import { OutlinedText } from '@/ui/components/OutlinedText'
import { Typo } from '@/ui/components/typographies'

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
          <OutlinedText>{firstEmoji}</OutlinedText>
          <OutlinedText>{secondEmoji}</OutlinedText>
          <OutlinedText>{thirdEmoji}</OutlinedText>
        </StyledIconWrapper>
        <StyledTextWrapper>
          <StyledTitle>{title}</StyledTitle>
          <Description>{description}</Description>
        </StyledTextWrapper>
      </StyledWrapper>
    </Root>
  )
}

const Root = styled(Slide)`
  ${({ theme }) => css`
    .inner {
      margin-right: 1.5rem;
      padding: 2rem 3rem;
      background-color: ${theme.colors.secondary}20;
      border-radius: 0.625rem;
      aspect-ratio: 2.8;
      @media (max-width: ${theme.mediaQueries.mobile}) {
        margin-right: 0;
      }
    }
  `}
`

const StyledTitle = styled(Typo.Heading2)`
  ${({ theme }) => css`
    margin: 1.5rem 0 0.25rem;
    font-weight: ${theme.fonts.weights.semiBold};
  `}
`

const StyledWrapper = styled.div`
  display: block;
  position: relative;
`

const StyledTextWrapper = styled.div`
  display: block;
  position: relative;
`

const Description = styled(Typo.Body)`
  font-size: ${(p) => p.theme.fonts.sizes['s']};
  line-height: 1.75rem;

  @media (max-width: ${(p) => p.theme.mediaQueries.mobile}) {
    line-height: 1.1875rem;
  }
`

const StyledIconWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    position: relative;
    font-size: ${theme.fonts.sizes['6xl']};
    span:nth-child(2) {
      transform: translateY(0.9rem);
      z-index: 1;
    }

    @media (max-width: ${theme.mediaQueries.mobile}) {
      font-size: ${theme.fonts.sizes['5xl']};
    }
  `}
`
