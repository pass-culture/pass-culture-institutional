import React from 'react'
import {
  type BlocksContent,
  BlocksRenderer,
} from '@strapi/blocks-react-renderer'
import styled, { css } from 'styled-components'

import { APIResponse } from '@/types/strapi'
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
        <StyledContentImagetWrapper className="second">
          <StyledImage
            src={getStrapiURL(image?.data.attributes.url)}
            alt={image?.data.attributes.alternativeText || ''}
          />
          {icon && (
            <StyledIcon className={isImageRight ? 'IconRight' : 'IconLeft'}>
              {icon}
            </StyledIcon>
          )}
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

const StyledContentWrapper = styled.div`
  ${({ theme }) => css`
    max-width: 90rem;
    margin: 0 auto;
    position: relative;
    transform: translateY(-8rem);
    padding: 10rem 3.5rem 2.5rem;
    display: grid;
    gap: 1.5rem;

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
    padding-left: 2rem;
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

    p {
      font-size: ${theme.fonts.sizes['xl']};
      line-height: 2.2;
      width: 70%;
    }

    @media (width < ${theme.mediaQueries.mobile}) {
      padding-left: 0;

      p {
        font-size: ${theme.fonts.sizes['m']};
        width: 100%;
      }
  `}
`

const StyledContentImagetWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: end;
    position: relative;
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

const StyledImage = styled.img`
  ${({ theme }) => css`
    max-width: 80%;
    height: auto;
    transform: rotate(2deg);
    box-shadow: -4px 8px 24px 0px rgba(0, 0, 0, 0.21);
    border-radius: 1.5rem;
    aspect-ratio: 385.54/480.87;

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
