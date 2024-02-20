import React from 'react'
import styled, { css } from 'styled-components'

import { Button } from '../button/Button'

type HeroProps = {
  title: string
  subTitle: string
  cta: { Label: string; URL: string }
  firstEmoji: string
  secondEmoji: string
  thirdEmoji: string
  fourthEmoji: string
}

export function Hero({
  title,
  subTitle,
  cta,
  firstEmoji,
  secondEmoji,
  thirdEmoji,
  fourthEmoji,
}: HeroProps) {
  return (
    <Root>
      <StyledContentWrapper>
        <StyledSubTitle>{subTitle}</StyledSubTitle>
        <StyledHeading dangerouslySetInnerHTML={{ __html: title }} />
        <StyledCta href={cta.URL}>{cta.Label}</StyledCta>

        <StyledCircle $index={1} aria-hidden="true">
          <StyledFirstEmoji>{firstEmoji}</StyledFirstEmoji>
          <StyledSecondEmoji>{secondEmoji}</StyledSecondEmoji>
        </StyledCircle>

        <StyledCircle $index={2} aria-hidden="true">
          <StyledThirdEmoji>{thirdEmoji}</StyledThirdEmoji>
        </StyledCircle>

        <StyledCircle $index={3} aria-hidden="true">
          <StyledFourthEmoji>{fourthEmoji}</StyledFourthEmoji>
        </StyledCircle>
      </StyledContentWrapper>
    </Root>
  )
}

const Root = styled.div`
  ${({ theme }) => css`
    background: linear-gradient(
      180deg,
      ${theme.colors.lightBlue} 0%,
      ${theme.colors.white} 100%
    );
    transform: translateY(-8rem);
  `}
`

const StyledContentWrapper = styled.div`
  max-width: 90rem;
  margin: 0 auto;
  text-align: center;
  position: relative;
  padding: calc(8rem + 10rem) 1.5rem 12.5rem;
`

const StyledSubTitle = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.secondary};
    font-size: ${theme.fonts.sizes['2xl']};
    font-weight: ${theme.fonts.weights.semiBold};
    margin-bottom: 1.5rem;

    @media (width < ${theme.mediaQueries.mobile}) {
      font-size: ${theme.fonts.sizes.s};
    }
  `}
`

const StyledHeading = styled.h1`
  ${({ theme }) => css`
    color: ${theme.colors.secondary};
    font-size: ${theme.fonts.sizes['8xl']};
    font-weight: ${theme.fonts.weights.bold};
    max-width: 44rem;
    margin: 0 auto 2rem;

    @media (width < ${theme.mediaQueries.mobile}) {
      font-size: ${theme.fonts.sizes['5xl']};
      margin-bottom: 0;
    }
  `}
`

const StyledCta = styled(Button)`
  outline: 5px solid blue !important;
`

const StyledCircle = styled.div<{ $index: 1 | 2 | 3 }>`
  ${({ $index }) => css`
    background-image: url('/images/home-circle-${$index}.svg');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    border-radius: 50%;
    width: ${$index === 1 ? '40rem' : $index === 2 ? '64rem' : '80rem'};
    aspect-ratio: 1 / 1;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    user-select: none;
    z-index: -${$index};
  `}
`

const StyledFirstEmoji = styled.span`
  ${({ theme }) => css`
    position: absolute;
    left: 4rem;
    top: 4rem;
    font-size: ${theme.fonts.sizes['7xl']};
    transform: rotate(-6deg);
  `}
`
const StyledSecondEmoji = styled.span`
  ${({ theme }) => css`
    position: absolute;
    left: 8rem;
    bottom: 1rem;
    font-size: ${theme.fonts.sizes['7xl']};
    transform: rotate(6deg);
  `}
`

const StyledThirdEmoji = styled.span`
  ${({ theme }) => css`
    position: absolute;
    right: -0.5rem;
    top: 35%;
    font-size: ${theme.fonts.sizes['7xl']};
    transform: rotate(6deg);
  `}
`

const StyledFourthEmoji = styled.span`
  ${({ theme }) => css`
    position: absolute;
    right: -1rem;
    top: 55%;
    font-size: ${theme.fonts.sizes['7xl']};
  `}
`
