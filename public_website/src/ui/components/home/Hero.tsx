import React, { useMemo } from 'react'
import styled, { css } from 'styled-components'

import ButtonScrollTo from '../buttonScrollTo/ButtonScrollTo'
import { ButtonWithCTA } from '../buttonWithCTA/ButtonWithCTA'
import { OutlinedText } from '../OutlinedText'
import { Typo } from '../typographies'
import Circle from './Circle'
import { ComponentHomeHeroSectionFragment } from '@/generated/graphql'
import { getStrapiURL } from '@/utils/apiHelpers'

export function Hero(props: ComponentHomeHeroSectionFragment) {
  const {
    title,
    subTitle,
    cta,
    firstEmoji,
    secondEmoji,
    thirdEmoji,
    fourthEmoji,
    fifthEmoji,
    sixthEmoji,
    images,
  } = props

  const setCircleCenter = useMemo(() => {
    if (images?.[0]?.url)
      return [
        {
          url: getStrapiURL(images?.[0]?.url),
          rotation: '-10deg',
          bottom: '3rem',
          right: '3rem',
        },
      ]

    return []
  }, [images])

  const setCircleMedium = useMemo(() => {
    if (images?.[1]?.url)
      return [
        {
          url: getStrapiURL(images?.[1]?.url),
          rotation: '-12deg',
          bottom: '12rem',
          left: '2rem',
        },
      ]

    return []
  }, [images])

  const setCircleLarge = useMemo(() => {
    if (images?.[2]?.url && images?.[3]?.url)
      return [
        {
          url: getStrapiURL(images?.[2]?.url),
          rotation: '6deg',
          top: '40%',
          left: '-1.5rem',
        },
        {
          url: getStrapiURL(images?.[3]?.url),
          rotation: '9deg',
          top: '30%',
          right: '0',
        },
      ]

    return []
  }, [images])

  return (
    <Root>
      <StyledHeroBackground>
        <StyledFirstEmoji as={OutlinedText}>{firstEmoji}</StyledFirstEmoji>
        <StyledSecondEmoji as={OutlinedText}>{secondEmoji}</StyledSecondEmoji>
        <StyledThirdEmoji as={OutlinedText}>{thirdEmoji}</StyledThirdEmoji>
        <StyledFourthEmoji as={OutlinedText}>{fourthEmoji}</StyledFourthEmoji>
        <StyledFifthEmoji as={OutlinedText}>{fifthEmoji}</StyledFifthEmoji>
        <StyledSixthEmoji as={OutlinedText}>{sixthEmoji}</StyledSixthEmoji>
      </StyledHeroBackground>

      <StyledSubTitle>{subTitle}</StyledSubTitle>
      <StyledHeading>{title}</StyledHeading>
      <StyledCta cta={cta} />
      <ButtonScrollTo noTranslate={false} />
      <Circle index={1} width="40rem" images={setCircleCenter}>
        <React.Fragment>
          <StyledFirstEmoji as={OutlinedText}>{firstEmoji}</StyledFirstEmoji>
          <StyledSecondEmoji as={OutlinedText}>{secondEmoji}</StyledSecondEmoji>
        </React.Fragment>
      </Circle>
      <Circle index={2} width="64rem" images={setCircleMedium}>
        <StyledThirdEmoji as={OutlinedText}>{thirdEmoji}</StyledThirdEmoji>
      </Circle>

      <Circle index={3} width="80rem" images={setCircleLarge}>
        <StyledFourthEmoji as={OutlinedText}>{fourthEmoji}</StyledFourthEmoji>
      </Circle>
    </Root>
  )
}

const Root = styled.div`
  ${({ theme }) => css`
    max-width: 90rem;
    margin: 0 auto 10rem;
    text-align: center;
    position: relative;
    padding: 8rem 1.5rem 12.5rem;

    @media (width < ${theme.mediaQueries.mobile}) {
      margin: 0 auto 0;
      padding: 0 1.5rem 3.75rem;
    }
  `}
`

const StyledHeroBackground = styled.div`
  ${({ theme }) => css`
    display: none;

    @media (width < ${theme.mediaQueries.mobile}) {
      display: block;
      background: url('/images/home-circles-mobile.svg');
      background-repeat: no-repeat;
      background-size: cover;
      background-position: top center;
      width: 100vw;
      height: auto;
      transform: translateX(-1.5rem);
      aspect-ratio: 1.5;
      margin-bottom: 2rem;
      user-select: none;

      span {
        font-size: ${theme.fonts.sizes['5xl']};
      }
    }
  `}
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

const StyledHeading = styled(Typo.Heading1)`
  ${({ theme }) => css`
    max-width: 44rem;
    margin: 0 auto 2rem;

    @media (width < ${theme.mediaQueries.mobile}) {
      font-size: ${theme.fonts.sizes['5xl']};
    }
  `}
`

const StyledCta = styled(ButtonWithCTA)`
  ${({ theme }) => css`
    @media (width < ${theme.mediaQueries.mobile}) {
      display: none;
    }
  `}
`

const StyledFirstEmoji = styled(Typo.Emoji)`
  ${({ theme }) => css`
    position: absolute;
    left: 4rem;
    top: 4rem;
    transform: rotate(-6deg);

    @media (width < ${theme.mediaQueries.mobile}) {
      top: -1rem;
      right: -2rem;
    }
  `}
`
const StyledSecondEmoji = styled(Typo.Emoji)`
  ${({ theme }) => css`
    position: absolute;
    left: 8rem;
    bottom: 1rem;
    transform: rotate(6deg);

    @media (width < ${theme.mediaQueries.mobile}) {
      top: 5.5rem;
      right: 3rem;
      left: inherit;
    }
  `}
`

const StyledThirdEmoji = styled(Typo.Emoji)`
  ${({ theme }) => css`
    position: absolute;
    right: -0.5rem;
    top: 35%;
    transform: rotate(6deg);

    @media (width < ${theme.mediaQueries.mobile}) {
      top: 4.5rem;
      left: 4.5rem;
      right: inherit;
    }
  `}
`

const StyledFourthEmoji = styled(Typo.Emoji)`
  ${({ theme }) => css`
    position: absolute;
    right: -1rem;
    top: 55%;
    transform: rotate(-10deg);

    @media (width < ${theme.mediaQueries.mobile}) {
      top: inherit;
      right: inherit;
      bottom: -1rem;
      left: 2.5rem;
    }
  `}
`

const StyledFifthEmoji = styled(Typo.Emoji)`
  ${({ theme }) => css`
    display: none;

    @media (width < ${theme.mediaQueries.mobile}) {
      display: inherit;
      position: absolute;
      bottom: -0.5rem;
      right: 2.5rem;
      transform: rotate(10deg);
    }
  `}
`

const StyledSixthEmoji = styled(Typo.Emoji)`
  ${({ theme }) => css`
    display: none;

    @media (width < ${theme.mediaQueries.mobile}) {
      display: inherit;
      position: absolute;
      top: 50%;
      left: 45%;
      transform: rotate(-10deg);
    }
  `}
`
