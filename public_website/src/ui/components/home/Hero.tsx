import React from 'react'
import styled, { css } from 'styled-components'

import { Button } from '../button/Button'
import { APIResponseCollection } from '@/types/strapi'
import { getStrapiURL } from '@/utils/apiHelpers'

type HeroProps = {
  title: string
  subTitle: string
  cta: { Label: string; URL: string }
  firstEmoji: string
  secondEmoji: string
  thirdEmoji: string
  fourthEmoji: string
  images: APIResponseCollection<'plugin::upload.file'> | null
}

export function Hero({
  title,
  subTitle,
  cta,
  firstEmoji,
  secondEmoji,
  thirdEmoji,
  fourthEmoji,
  images,
}: HeroProps) {
  return (
    <Root>
      <StyledContentWrapper>
        <StyledSubTitle>{subTitle}</StyledSubTitle>
        <StyledHeading dangerouslySetInnerHTML={{ __html: title }} />
        <StyledCta href={cta.URL}>{cta.Label}</StyledCta>

        <StyledCircle $index={1} $width="40rem" aria-hidden="true">
          <StyledFirstEmoji>{firstEmoji}</StyledFirstEmoji>
          <StyledSecondEmoji>{secondEmoji}</StyledSecondEmoji>
          {images && (
            <StyledImageWrapper $rotation="-10deg" $bottom="3rem" $right="3rem">
              <StyledImageLayer />
              <StyledImage
                $imageUrl={getStrapiURL(
                  images.data[0]?.attributes.url
                )}></StyledImage>
            </StyledImageWrapper>
          )}
        </StyledCircle>

        <StyledCircle $index={2} $width="64rem" aria-hidden="true">
          <StyledThirdEmoji>{thirdEmoji}</StyledThirdEmoji>
          {images && (
            <StyledImageWrapper $rotation="-12deg" $bottom="12rem" $left="2rem">
              <StyledImageLayer />
              <StyledImage
                $imageUrl={getStrapiURL(
                  images.data[1]?.attributes.url
                )}></StyledImage>
            </StyledImageWrapper>
          )}
        </StyledCircle>

        <StyledCircle $index={3} $width="80rem" aria-hidden="true">
          <StyledFourthEmoji>{fourthEmoji}</StyledFourthEmoji>
          {images && (
            <React.Fragment>
              <StyledImageWrapper $rotation="6deg" $top="40%" $left="-1.5rem">
                <StyledImageLayer />
                <StyledImage
                  $imageUrl={getStrapiURL(
                    images.data[2]?.attributes.url
                  )}></StyledImage>
              </StyledImageWrapper>
              <StyledImageWrapper $rotation="9deg" $top="30%" $right="0">
                <StyledImageLayer />
                <StyledImage
                  $imageUrl={getStrapiURL(
                    images.data[3]?.attributes.url
                  )}></StyledImage>
              </StyledImageWrapper>
            </React.Fragment>
          )}
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
    overflow: hidden;
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
    font-size: ${theme.fonts.sizes['7xl']};
    z-index: -1;
  `}
`

const StyledFirstEmoji = styled.span`
  position: absolute;
  left: 4rem;
  top: 4rem;
  transform: rotate(-6deg);
`
const StyledSecondEmoji = styled.span`
  position: absolute;
  left: 8rem;
  bottom: 1rem;
  transform: rotate(6deg);
`

const StyledThirdEmoji = styled.span`
  position: absolute;
  right: -0.5rem;
  top: 35%;
  transform: rotate(6deg);
`

const StyledFourthEmoji = styled.span`
  position: absolute;
  right: -1rem;
  top: 55%;
  transform: rotate(-10deg);
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
