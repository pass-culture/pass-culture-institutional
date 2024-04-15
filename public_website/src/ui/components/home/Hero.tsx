import React from 'react'
import styled, { css } from 'styled-components'

import { CTA } from '../../../types/CTA'
import { ButtonWithCTA } from '../buttonWithCTA/ButtonWithCTA'
import { OutlinedText } from '../OutlinedText'
import { Typo } from '../typographies'
import { APIResponseData } from '@/types/strapi'
import { getStrapiURL } from '@/utils/apiHelpers'

type HeroProps = {
  title: string
  subTitle: string
  cta: CTA
  firstEmoji: string
  secondEmoji: string
  thirdEmoji: string
  fourthEmoji: string
  fifthEmoji: string
  sixthEmoji: string
  images: APIResponseData<'plugin::upload.file'>[] | null
}

export function Hero({
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
}: HeroProps) {
  return (
    <Root>
      <StyledHeroBackground>
        <StyledFirstEmoji as={OutlinedText} dilationRadius={1} shadow>
          {firstEmoji}
        </StyledFirstEmoji>
        <StyledSecondEmoji as={OutlinedText} dilationRadius={1} shadow>
          {secondEmoji}
        </StyledSecondEmoji>
        <StyledThirdEmoji as={OutlinedText} dilationRadius={1} shadow>
          {thirdEmoji}
        </StyledThirdEmoji>
        <StyledFourthEmoji as={OutlinedText} dilationRadius={1} shadow>
          {fourthEmoji}
        </StyledFourthEmoji>
        <StyledFifthEmoji as={OutlinedText} dilationRadius={1} shadow>
          {fifthEmoji}
        </StyledFifthEmoji>
        <StyledSixthEmoji as={OutlinedText} dilationRadius={1} shadow>
          {sixthEmoji}
        </StyledSixthEmoji>
      </StyledHeroBackground>

      <StyledSubTitle>{subTitle}</StyledSubTitle>
      <StyledHeading dangerouslySetInnerHTML={{ __html: title }} />
      <StyledCta cta={cta} />

      <StyledCircle $index={1} $width="40rem" aria-hidden="true">
        <StyledFirstEmoji as={OutlinedText} dilationRadius={1} shadow>
          {firstEmoji}
        </StyledFirstEmoji>
        <StyledSecondEmoji as={OutlinedText} dilationRadius={1} shadow>
          {secondEmoji}
        </StyledSecondEmoji>
        {images && (
          <StyledImageWrapper $rotation="-10deg" $bottom="3rem" $right="3rem">
            <StyledImageLayer />
            <StyledImage
              $imageUrl={getStrapiURL(images[0]?.attributes.url)}></StyledImage>
          </StyledImageWrapper>
        )}
      </StyledCircle>

      <StyledCircle $index={2} $width="64rem" aria-hidden="true">
        <StyledThirdEmoji as={OutlinedText} dilationRadius={1} shadow>
          {thirdEmoji}
        </StyledThirdEmoji>
        {images && (
          <StyledImageWrapper $rotation="-12deg" $bottom="12rem" $left="2rem">
            <StyledImageLayer />
            <StyledImage
              $imageUrl={getStrapiURL(images[1]?.attributes.url)}></StyledImage>
          </StyledImageWrapper>
        )}
      </StyledCircle>

      <StyledCircle $index={3} $width="80rem" aria-hidden="true">
        <StyledFourthEmoji as={OutlinedText} dilationRadius={1} shadow>
          {fourthEmoji}
        </StyledFourthEmoji>
        {images && (
          <React.Fragment>
            <StyledImageWrapper $rotation="6deg" $top="40%" $left="-1.5rem">
              <StyledImageLayer />
              <StyledImage
                $imageUrl={getStrapiURL(
                  images[2]?.attributes.url
                )}></StyledImage>
            </StyledImageWrapper>
            <StyledImageWrapper $rotation="9deg" $top="30%" $right="0">
              <StyledImageLayer />
              <StyledImage
                $imageUrl={getStrapiURL(
                  images[3]?.attributes.url
                )}></StyledImage>
            </StyledImageWrapper>
          </React.Fragment>
        )}
      </StyledCircle>
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
      padding: 0 1.5rem 5rem;
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

const StyledCircle = styled.div<{ $index: number; $width: string }>`
  ${({ theme, $index, $width }) => css`
    background-image: url('/images/home-circle-${$index}.svg');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    border-radius: 50%;
    width: ${$width};
    aspect-ratio: 1 / 1;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    user-select: none;
    z-index: -1;

    span {
      font-size: ${theme.fonts.sizes['7xl']};
    }

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

const StyledImageWrapper = styled.div<{
  $rotation: string
  $top?: string
  $bottom?: string
  $right?: string
  $left?: string
}>`
  ${({ theme, $rotation, $top, $bottom, $left, $right }) => css`
    height: 6.25rem;
    width: 4rem;
    position: absolute;
    top: ${$top};
    bottom: ${$bottom};
    left: ${$left};
    right: ${$right};
    transform: rotate(${$rotation});

    @media (width < ${theme.mediaQueries.mobile}) {
      display: none;
    }
  `}
`

const StyledImage = styled.div<{
  $imageUrl: string
}>`
  ${({ $imageUrl }) => css`
    background-image: ${$imageUrl ? `url(${$imageUrl})` : 'none'};
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: 1rem;
    position: absolute;
    inset: 0;
  `}
`

const StyledImageLayer = styled.div`
  ${({ theme }) => css`
    position: absolute;
    inset: 0;
    border-radius: 1rem;
    background: ${theme.colors.purple};
    transform: rotate(6deg);
  `}
`
