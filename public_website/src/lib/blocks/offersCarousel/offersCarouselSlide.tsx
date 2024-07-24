import React from 'react'
import { Slide } from 'pure-react-carousel'
import styled, { css } from 'styled-components'

import { CARD_BACKGROUNDS, ItemsTheme } from '@/theme/style'
import { theme } from '@/theme/theme'
import { OffersCarouselSlideProps } from '@/types/props'
import { OutlinedText } from '@/ui/components/OutlinedText'
import { parseText } from '@/utils/parseText'

export function OffersCarouselSlide(props: OffersCarouselSlideProps) {
  const { slideIndex, title, surtitle, firstIcon, secondIcon, text, theme } =
    props
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
              <OutlinedText shadow={false}>
                <span aria-label={parseText(surtitle).accessibilityLabel}>
                  {parseText(surtitle).processedText}
                </span>
              </OutlinedText>
            </StyledOffersSurtitle>
            <StyledFirstIcon shadow aria-hidden="true">
              {firstIcon}
            </StyledFirstIcon>
            <StyledSecondIcon shadow aria-hidden="true">
              {secondIcon}
            </StyledSecondIcon>
          </StyledOffersHeader>
          <StyledOffersContentWrapper>
            <h3>{title}</h3>
            <p>{text}</p>
          </StyledOffersContentWrapper>
        </Card>
      </CardContainer>
    </Root>
  )
}

const Root = styled(Slide)`
  ${({ theme }) => css`
    .inner {
      padding: 1rem;
      margin-right: 1rem;

      @media (width < ${theme.mediaQueries.largeDesktop}) {
        margin-right: 1rem;
        margin-left: 1rem;
      }
    }
  `}
`

const CardContainer = styled.div<{ $slideTheme: ItemsTheme }>`
  position: relative;
  z-index: 1;
  --card-background: ${({ $slideTheme }) => CARD_BACKGROUNDS[$slideTheme]};
`

const Card = styled.div`
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 6rem 2rem;
  width: calc(100% - 4rem);
  height: 15rem;
  position: relative;
  background: var(--card-background);

  @media (width < ${theme.mediaQueries.largeDesktop}) {
    padding: 3rem 1rem;
    width: calc(100% - 2rem);
  }
`

const StyledOffersHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  align-self: center;
  width: 80%;
  margin-bottom: 2.5rem;
  transform: rotate(-2.15deg);
  flex-shrink: 0;
`

const StyledFirstIcon = styled(OutlinedText)`
  ${({ theme }) => css`
    position: absolute;
    bottom: 0;
    left: 0;
    font-size: ${theme.fonts.sizes['6xl']};
    transform: translate(-1rem, 2rem);

    @media (width < ${theme.mediaQueries.largeDesktop}) {
      display: none;
    }
  `}
`

const StyledSecondIcon = styled(OutlinedText)`
  ${({ theme }) => css`
    position: absolute;
    top: 0;
    right: 0;
    font-size: ${theme.fonts.sizes['6xl']};
    transform: translate(1rem, -3rem);

    @media (width < ${theme.mediaQueries.largeDesktop}) {
      display: none;
    }
  `}
`
const StyledOffersSurtitle = styled.h2`
  ${({ theme }) => css`
    font-size: ${theme.fonts.sizes['5xll']};
    font-weight: ${theme.fonts.weights.black};
    line-height: 1;
    letter-spacing: -0.0625rem;
    text-align: center;
    color: ${theme.colors.black};
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
      font-size: ${theme.fonts.sizes['4xl']};
      font-weight: ${theme.fonts.weights.bold};
      line-height: 1.1;
      letter-spacing: -0.0625rem;
    }

    p {
      width: 70%;
      text-align: center;
      font-size: ${theme.fonts.sizes['xl']};
    }

    @media (width < ${theme.mediaQueries.largeDesktop}) {
      gap: 0.5rem;

      h3 {
        font-size: ${theme.fonts.sizes['2xl']};
      }

      p {
        font-size: ${theme.fonts.sizes['s']};
      }
    }
  `}
`
