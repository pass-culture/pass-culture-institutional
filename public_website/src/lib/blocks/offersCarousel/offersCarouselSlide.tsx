import React from 'react'
import { Slide } from 'pure-react-carousel'
import styled, { css } from 'styled-components'

import { theme } from '@/theme/theme'

export type OffersCarouselSlideProps = {
  slideIndex: number
  title: string
  surtitle: string
  secondSurtitle: string
  firstIcon: string
  secondIcon: string
  text: string
}

export function OffersCarouselSlide({
  slideIndex,
  title,
  surtitle,
  firstIcon,
  secondIcon,
  secondSurtitle,
  text,
}: OffersCarouselSlideProps) {
  return (
    <Root
      index={slideIndex}
      key={title}
      innerClassName="inner"
      aria-roledescription="diapositive">
      <CardContainer>
        <Card>
          <StyledOffersHeader>
            <StyledOffersSurtitle>{surtitle}</StyledOffersSurtitle>
            <StyledOffersSurtitle>{secondSurtitle}</StyledOffersSurtitle>
            <StyledFirstIcon>{firstIcon}</StyledFirstIcon>
            <StyledSecondIcon>{secondIcon}</StyledSecondIcon>
          </StyledOffersHeader>
          <StyledOffersContentWrapper>
            <h3>{title}</h3>
            <p>{text}</p>
          </StyledOffersContentWrapper>
        </Card>
        <BackgroundLayer />
        <SecondBackgroundLayer />
      </CardContainer>
    </Root>
  )
}

const Root = styled(Slide)`
  ${({ theme }) => css`
    .inner {
      margin-right: 9rem;

      @media (width < ${theme.mediaQueries.mobile}) {
        margin-right: 1rem;
        margin-left: 1rem;
      }
    }
  `}
`

const CardContainer = styled.div`
  position: relative;
  z-index: 1;

  @media (width < ${theme.mediaQueries.tablet}) {
  }
`

const Card = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.tertiary};
    border-radius: 1rem;

    display: flex;
    flex-direction: column;
    padding: 6rem 2rem;
    width: calc(100% - 4rem);
    height: 15rem;

    position: relative;

    @media (width < ${theme.mediaQueries.tablet}) {
    }
  `}
`

const BackgroundLayer = styled.div`
  ${({ theme }) => css`
    position: absolute;
    content: '';
    inset: 0;
    background-color: ${theme.colors.secondary};
    transform: rotate(7deg);
    border-radius: 1.5rem;
    width: 100%;
    height: 100%;
    z-index: -1;

    @media (width < ${theme.mediaQueries.tablet}) {
    }
  `}
`

const SecondBackgroundLayer = styled.div`
  ${({ theme }) => css`
    position: absolute;
    content: '';
    inset: 0;
    background-color: ${theme.colors.tertiary}50;
    transform: rotate(6deg);
    border-radius: 1.5rem;
    width: 100%;
    height: 100%;
    z-index: -1;

    @media (width < ${theme.mediaQueries.tablet}) {
    }
  `}
`

const StyledOffersHeader = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;

    align-self: center;
    width: 80%;

    margin-bottom: 4rem;
    margin-top: 1rem;

    transform: rotate(-2.15deg);
    flex-shrink: 0;
    filter: drop-shadow(-4px 8px 24px rgba(0, 0, 0, 0.21));
    @media (width < ${theme.mediaQueries.mobile}) {
      margin-bottom: 2.5rem;
    }
  `}
`

const StyledFirstIcon = styled.p`
  ${({ theme }) => css`
    position: absolute;
    top: 0;
    left: 0;
    font-size: ${theme.fonts.sizes['6xl']};
  `}
`

const StyledSecondIcon = styled.p`
  ${({ theme }) => css`
    position: absolute;
    bottom: 0;
    right: 0;
    font-size: ${theme.fonts.sizes['6xl']};
  `}
`
const StyledOffersSurtitle = styled.h2`
  ${({ theme }) => css`
    font-size: ${theme.fonts.sizes['4xl']};
    font-weight: ${theme.fonts.weights.bold};
    line-height: 1;

    &:nth-child(2) {
      text-align: right;
    }
  `}
`

const StyledOffersContentWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    text-align: center;
    transform: rotate(-1deg);

    h3 {
      font-size: ${theme.fonts.sizes['4xl']};
      font-weight: ${theme.fonts.weights.bold};
    }

    p {
      width: 70%;
      text-align: center;
    }
    @media (width < ${theme.mediaQueries.mobile}) {
      gap: 0.5rem;
    }
  `}
`
