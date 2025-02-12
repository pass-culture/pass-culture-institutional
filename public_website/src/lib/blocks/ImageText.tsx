import React from 'react'
import { BlocksRenderer } from '@strapi/blocks-react-renderer'
import styled, { css } from 'styled-components'

import BlockRendererWithCondition from '../BlockRendererWithCondition'
import { ImageTextProps } from '@/types/props'
import { ContentWrapper } from '@/ui/components/ContentWrapper'
import { OutlinedText } from '@/ui/components/OutlinedText'
import StyledBlocksRenderer from '@/ui/components/StyledBlocksRenderer'
import { Typo } from '@/ui/components/typographies'
import { getStrapiURL } from '@/utils/apiHelpers'
import { isRenderable } from '@/utils/isRenderable'

export function ImageText(props: ImageTextProps) {
  const { title, text, image, icon, isImageRight = false } = props

  const image_props = image?.data?.attributes?.url

  return (
    <Root>
      <StyledContentWrapper className={isImageRight ? 'right' : 'left'}>
        <StyledContentTextWrapper className="first">
          <BlockRendererWithCondition condition={isRenderable(title)}>
            <StyledHeading>{title as string}</StyledHeading>
          </BlockRendererWithCondition>

          <StyledBlocksRenderer>
            <BlocksRenderer content={text} />
          </StyledBlocksRenderer>
        </StyledContentTextWrapper>
        <StyledContentImagetWrapper
          className="second"
          $imageOnRight={isImageRight}>
          <BlockRendererWithCondition condition={isRenderable(image_props)}>
            <ImageContainer $imageOnRight={isImageRight}>
              <StyledImage
                src={getStrapiURL(image_props)}
                alt={image?.data?.attributes?.alternativeText ?? ''}
              />
              <BlockRendererWithCondition condition={isRenderable(icon)}>
                <StyledIcon className={isImageRight ? 'IconRight' : 'IconLeft'}>
                  {icon}
                </StyledIcon>
              </BlockRendererWithCondition>
            </ImageContainer>
          </BlockRendererWithCondition>
        </StyledContentImagetWrapper>
      </StyledContentWrapper>
    </Root>
  )
}

const Root = styled.div`
  ${({ theme }) => css`
    .right {
      grid-template-columns: 1.5fr 1fr;
      grid-template-areas: 'first second';
      position: relative;

      .IconRight {
        top: 6rem;
        right: -2rem;
        z-index: 2;
      }
    }

    .left {
      grid-template-columns: 1fr 1.5fr;
      grid-template-areas: 'second first';
      position: relative;
      gap: 2.5rem;

      .IconLeft {
        top: 6rem;
        right: -5%;
        transform: rotate(-20deg);
        z-index: 2;
      }
    }
    @media (width < ${theme.mediaQueries.tablet}) {
      .right {
        .IconRight {
          top: 3rem;
          right: auto;
          left: -1rem;
          z-index: 2;
        }
      }

      .left {
        .IconLeft {
          top: 3rem;
          right: -5%;
          z-index: 2;
        }
      }
    }
    @media (width < ${theme.mediaQueries.mobile}) {
      .right,
      .left {
        grid-template-columns: 1fr;
        padding: 0 1.25rem 0;
        grid-template-areas:
          'second'
          'first';

        .IconRight {
          top: 2rem;
          left: 80%;
          z-index: 2;
        }

        .IconLeft {
          top: 2rem;
          right: -5%;
          z-index: 2;
        }
      }
    }
  `}
`
const StyledContentWrapper = styled(ContentWrapper)`
  ${({ theme }) => css`
    position: relative;
    display: grid;
    gap: 2.5rem;
    grid-area: first;
    }

    .second {
      grid-area: second;
    }

    @media (width < ${theme.mediaQueries.mobile}) {
      padding: calc(10rem + 10rem) 1.5rem 2.5rem;
      gap: 3rem;
    }
  `}
`
const StyledContentTextWrapper = styled.div`
  ${({ theme }) => css`
    font-weight: ${theme.fonts.weights.medium};
    line-height: 2.125rem;
    font-size: ${theme.fonts.sizes['m']};
    display: flex;
    flex-direction: column;
    justify-content: center;

    ul {
      list-style-type: disc;
      padding-left: 2rem;
    }

    a {
      color: ${theme.colors.primary}!important;
      text-decoration: underline;
      outline-offset: 10px;
      font-weight: 600;
      &:hover{
        text-decoration: none;
      }
      &:focus{
        outline:2px solid ${theme.colors.primary};
      }
    }

    strong {
      font-weight: ${({ theme }) => theme.fonts.weights.bold};
    }

    @media (width < ${theme.mediaQueries.mobile}) {
      padding-left: 0;


      p {
        font-size: ${theme.fonts.sizes['m']};
        width: 100%;
        color: ${theme.colors.black};
        line-height: 2.125;
      }
  `}
`
const StyledContentImagetWrapper = styled.div<{ $imageOnRight?: boolean }>`
  ${({ theme, $imageOnRight: $imageOnLeft }) => css`
    display: flex;
    justify-content: ${$imageOnLeft ? 'end' : 'start'};
    position: relative;
    align-items: self-start;
    height: max-content;

    &:after {
      content: ' ';
      background-color: ${theme.colors.aquamarine};
      position: absolute;
      top: 65%;
      ${$imageOnLeft ? 'left: 0%' : 'right:0%'};

      border-radius: ${theme.radius.sm};
      height: 40%;
      width: 120%;
      z-index: -1;

      @media (width < ${theme.mediaQueries.mobile}) {
        width: 150%;
        left: -1.5rem;
        border-radius: 0;
      }
    }

    @media (width < ${theme.mediaQueries.tablet}) {
      justify-content: center;
    }

    @media (width < ${theme.mediaQueries.mobile}) {
      justify-content: center;
    }
  `}
`
const StyledHeading = styled(Typo.Heading2)`
  ${({ theme }) => css`
    margin: 0 0 3rem;

    @media (width < ${theme.mediaQueries.mobile}) {
      margin: 0 0 1rem;
      line-height: 1.3;
    }
  `}
`
const ImageContainer = styled.div<{ $imageOnRight?: boolean }>`
  aspect-ratio: 24/30;
  max-width: 80%;
  text-align: center;
  position: relative;
`
const StyledImage = styled.img`
  ${({ theme }) => css`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: ${theme.radius.sm};
  `}
`
const StyledIcon = styled(OutlinedText)`
  ${({ theme }) => css`
    font-size: ${theme.fonts.sizes['8xl']};
    height: auto;
    transform: rotate(2deg);
    position: absolute;

    @media (width < ${theme.mediaQueries.tablet}) {
      font-size: ${theme.fonts.sizes['6xl']};
    }
  `}
`
