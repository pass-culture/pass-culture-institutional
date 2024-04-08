import React from 'react'
import { Slide } from 'pure-react-carousel'
import styled, { css } from 'styled-components'

import { theme } from '@/theme/theme'
import { OutlinedText } from '@/ui/components/OutlinedText'

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
            <StyledOffersSurtitle>
              <OutlinedText dilationRadius={3}>
                <span dangerouslySetInnerHTML={{ __html: surtitle }} />
              </OutlinedText>
            </StyledOffersSurtitle>
            <StyledFirstIcon aria-hidden="true" dilationRadius={2}>
              {firstIcon}
            </StyledFirstIcon>
            <StyledSecondIcon aria-hidden="true" dilationRadius={2}>
              {secondIcon}
            </StyledSecondIcon>
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
      padding: 1rem;

      @media (width < ${theme.mediaQueries.mobile}) {
        margin-right: 1rem;
        margin-left: 1rem;
      }
    }
  `}
`

const CARD_BACKGROUNDS: Record<OffersCarouselSlideTheme, [string, string]> = {
  purple: [theme.uniqueColors.purple, theme.uniqueColors.purple],
  yellow: [
    `linear-gradient(141.28deg, ${theme.uniqueColors.yellowLight} 1.24%, ${theme.uniqueColors.yellowDark} 97.04%)`,
    theme.uniqueColors.yellow,
  ],
  magenta: [
    `linear-gradient(140.89deg, ${theme.uniqueColors.magentaLight} 1.32%, ${theme.uniqueColors.magenta} 99.76%)`,
    theme.uniqueColors.magentaDark,
  ],
  orange: [
    `linear-gradient(139.76deg, ${theme.uniqueColors.orangeLight} -0.2%, ${theme.uniqueColors.orangeDark} 98.71%)`,
    theme.uniqueColors.orange,
  ],
  green: [theme.uniqueColors.green, theme.uniqueColors.green],
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
  justify-content: space-between;
  padding: 6rem 2rem;
  width: calc(100% - 4rem);
  height: 15rem;

  position: relative;
  background: var(--card-background);

  box-shadow: ${theme.shadows.banner};
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

    box-shadow: ${theme.shadows.banner};

    mix-blend-mode: color-burn;
  `}
`

const FirstBackgroundLayer = styled(BackgroundLayer)`
  transform: rotate(6.5deg);
`

const SecondBackgroundLayer = styled(BackgroundLayer)`
  transform: rotate(2.5deg);
`

const StyledOffersHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;

  align-self: center;
  width: 80%;

  transform: rotate(-2.15deg);
  flex-shrink: 0;
  filter: drop-shadow(-4px 8px 24px rgba(0, 0, 0, 0.21));
`

const StyledFirstIcon = styled(OutlinedText)`
  ${({ theme }) => css`
    position: absolute;
    bottom: 0;
    left: 0;
    font-size: ${theme.fonts.sizes['6xl']};
    transform: translate(-1rem, 2rem);
  `}
`

const StyledSecondIcon = styled(OutlinedText)`
  ${({ theme }) => css`
    position: absolute;
    top: 0;
    right: 0;
    font-size: ${theme.fonts.sizes['6xl']};
    transform: translate(1rem, -3rem);
  `}
`
const StyledOffersSurtitle = styled.h2`
  ${({ theme }) => css`
    font-size: ${theme.fonts.sizes['5xl']};
    font-weight: ${theme.fonts.weights.black};
    line-height: 1;
    letter-spacing: -0.0625rem;
    text-align: center;
    color: var(--card-surtitle-color);
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

    h3 {
      font-size: ${theme.fonts.sizes['5xl']};
      font-weight: ${theme.fonts.weights.bold};
      font-size: 35px;
      line-height: 50px;
      letter-spacing: -1.044583797454834px;
    }

    p {
      width: 70%;
      text-align: center;
      font-size: ${theme.fonts.sizes['xl']};
    }
    @media (width < ${theme.mediaQueries.mobile}) {
      gap: 0.5rem;
    }
  `}
`
