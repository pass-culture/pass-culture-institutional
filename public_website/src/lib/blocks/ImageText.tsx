import React from 'react'
import {
  type BlocksContent,
  BlocksRenderer,
} from '@strapi/blocks-react-renderer'
import styled, { css } from 'styled-components'

import { APIResponse } from '@/types/strapi'
import { ContentWrapper } from '@/ui/components/ContentWrapper'
import { OutlinedText } from '@/ui/components/OutlinedText'
import { Typo } from '@/ui/components/typographies'
import { getStrapiURL } from '@/utils/apiHelpers'
type HeroProps = {
  title?: string
  text: BlocksContent
  image?: APIResponse<'plugin::upload.file'> | null
  icon?: string
  isImageRight?: boolean
}

export function ImageText({
  title,
  text,
  image,
  icon,
  isImageRight,
}: HeroProps) {
  return (
    <Root>
      <StyledContentWrapper className={isImageRight ? 'right' : 'left'}>
        <StyledContentTextWrapper className="first">
          {title && (
            <StyledHeading dangerouslySetInnerHTML={{ __html: title }} />
          )}
          <BlocksRenderer content={text} />
        </StyledContentTextWrapper>
        <StyledContentImagetWrapper
          className="second"
          $imageOnRight={isImageRight}>
          <ImageContainer>
            <StyledImage
              src={getStrapiURL(image?.data.attributes.url)}
              alt={image?.data.attributes.alternativeText || ''}
            />
            {icon && (
              <StyledIcon className={isImageRight ? 'IconRight' : 'IconLeft'}>
                {icon}
              </StyledIcon>
            )}
          </ImageContainer>
        </StyledContentImagetWrapper>
      </StyledContentWrapper>
    </Root>
  )
}

const Root = styled.div`
  ${({ theme }) => css`
    overflow: hidden;

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
        right: -2rem;
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
        grid-template-areas: 'first second';
        grid-template-columns: 1.5fr 1fr;

        .IconLeft {
          top: 3rem;
          right: auto;
          left: -1rem;
          z-index: 2;
        }
      }
    }
    @media (width < ${theme.mediaQueries.mobile}) {
      .right,
      .left {
        grid-template-columns: 1fr;
        padding: 10rem 1.5rem 2.5rem;
        grid-template-areas:
          'second'
          'first';

        .IconRight,
        .IconLeft {
          top: 1rem;
          left: 2rem;
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
    gap: 1.5rem;

    padding-top: 1rem;
    padding-bottom: 1rem;

    .first {
      grid-area: first;
    }

    .second {
      grid-area: second;
    }

    @media (width < ${theme.mediaQueries.mobile}) {
      padding: calc(10rem + 10rem) 1.5rem 2.5rem;
    }
  `}
`

const StyledContentTextWrapper = styled.div`
  ${({ theme }) => css`
    font-weight: ${theme.fonts.weights.medium};
    line-height: 2.25rem;
    font-size: ${theme.fonts.sizes['xl']};

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
      }
  `}
`

const StyledContentImagetWrapper = styled.div<{ $imageOnRight?: boolean }>`
  ${({ theme, $imageOnRight: $imageOnLeft }) => css`
    display: flex;
    justify-content: ${$imageOnLeft ? 'end' : 'start'};
    position: relative;
    align-items: self-start;

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
    max-width: 36rem;
    margin: 0 0 3rem;

    @media (width < ${theme.mediaQueries.mobile}) {
      margin: 0 0 1rem;
    }
  `}
`

const ImageContainer = styled.div`
  transform: rotate(2deg);
  aspect-ratio: 385.54/480.87;
  max-width: 80%;
  text-align: center;
`

const StyledImage = styled.img`
  ${({ theme }) => css`
    width: 100%;
    height: 100%;
    object-fit: cover;
    box-shadow: -4px 8px 24px 0px rgba(0, 0, 0, 0.21);
    border-radius: 1.5rem;

    @media (width < ${theme.mediaQueries.tablet}) {
      max-width: 100%;
    }
    @media (width < ${theme.mediaQueries.mobile}) {
      max-width: 80%;
    }
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
