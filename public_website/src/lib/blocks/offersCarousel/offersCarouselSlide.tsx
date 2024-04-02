import React from 'react'
import { Slide } from 'pure-react-carousel'
import styled, { css } from 'styled-components'

type OffersCarouselSlideTheme =
  | 'purple'
  | 'yellow'
  | 'magenta'
  | 'orange'
  | 'green'

export type OffersCarouselSlideProps = {
  slideIndex: number
  title: string
  surtitle: string
  secondSurtitle: string
  firstIcon: string
  secondIcon: string
  text: string
  theme: OffersCarouselSlideTheme
}

export function OffersCarouselSlide({
  slideIndex,
  title,
  surtitle,
  firstIcon,
  secondIcon,
  secondSurtitle,
  text,
  theme,
}: OffersCarouselSlideProps) {
  return (
    <Root
      index={slideIndex}
      key={title}
      innerClassName="inner"
      aria-roledescription="diapositive">
      <CardContainer $slideTheme={theme}>
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
        <FirstBackgroundLayer />
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

const CARD_BACKGROUNDS: Record<OffersCarouselSlideTheme, [string, string]> = {
  purple: ['#ad86ff', '#ad86ff'],
  yellow: [
    'linear-gradient(141.28deg, #FFD748 1.24%, #DFBD0C 97.04%)',
    '#E5C216',
  ],
  magenta: [
    'linear-gradient(140.89deg, #FF5996 1.32%, #F8045E 99.76%)',
    '#CF1D5F',
  ],
  orange: [
    'linear-gradient(139.76deg, #FF8F60 -0.2%, #E64B0A 98.71%)',
    '#F0652B',
  ],
  green: ['#27DCA8', '#27DCA8'],
}

const CardContainer = styled.div<{ $slideTheme: OffersCarouselSlideTheme }>`
  position: relative;
  z-index: 1;

  --card-background: ${({ $slideTheme }) => CARD_BACKGROUNDS[$slideTheme][0]};
  --card-background-layer-backgroud: ${({ $slideTheme }) =>
    CARD_BACKGROUNDS[$slideTheme][1]};
`

const Card = styled.div`
  border-radius: 1rem;

  display: flex;
  flex-direction: column;
  padding: 6rem 2rem;
  width: calc(100% - 4rem);
  height: 15rem;

  position: relative;
  background: var(--card-background);
`

const BackgroundLayer = styled.div`
  ${({ theme }) => css`
    position: absolute;
    content: '';
    inset: 0;
    background: var(--card-background-layer-backgroud);

    border-radius: 1.5rem;
    width: 100%;
    height: 100%;
    z-index: -1;

    box-shadow: -4px 8px 24px 0px ${theme.shadows.banner};
  `}
`

const FirstBackgroundLayer = styled(BackgroundLayer)`
  transform: rotate(7deg);
`

const SecondBackgroundLayer = styled(BackgroundLayer)`
  transform: rotate(2deg);
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
