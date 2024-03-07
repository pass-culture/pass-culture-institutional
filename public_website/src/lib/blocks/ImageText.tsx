import React from 'react'
import styled, { css } from 'styled-components'

import { Typo } from '@/ui/components/typographies'
import { APIResponseData } from '@/types/strapi'
import { getStrapiURL } from '@/utils/apiHelpers'

type HeroProps = {
  title: string
  description: string
  image?: APIResponseData<'plugin::upload.file'> | null
  icon?: APIResponseData<'plugin::upload.file'> | null
  isImageRight?: boolean
}

export function ImageText({
  title,
  description,
  image,
  icon,
  isImageRight,
}: HeroProps) {
  return (
    <Root>
      <StyledContentWrapper className={isImageRight ? 'right' : 'left'}>
        <StyledIcon
          className={isImageRight ? 'Iright' : 'Ileft'}
          src={getStrapiURL(icon?.attributes.url)}
          alt={icon?.attributes.alternativeText}
        />
        <StyledContentTextWrapper className="first">
          <StyledHeading dangerouslySetInnerHTML={{ __html: title }} />
          <StyledText>{description}</StyledText>
        </StyledContentTextWrapper>
        <StyledContentImagetWrapper className="second">
          <StyledImage
            src={getStrapiURL(image?.attributes.url)}
            alt={image?.attributes.alternativeText}
          />
        </StyledContentImagetWrapper>
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
    overflow: hidden;

    .right {
      grid-template-columns: 1.5fr 1fr;
      grid-template-areas: 'first second';
      position: relative;

      .Iright {
        top: 36rem;
        right: -1rem;
        z-index: 2;
      }
    }

    .left {
      grid-template-columns: 1fr 1.5fr;
      grid-template-areas: 'second first';
      position: relative;
      gap: 2.5rem;

      .Ileft {
        top: 36rem;
        left: 33.5rem;
        z-index: 2;
      }
    }

    @media (width < ${theme.mediaQueries.mobile}) {
      .right,
      .left {
        grid-template-columns: 1fr;
        padding: calc(10rem + 10rem) 1.5rem 2.5rem;
        grid-template-areas:
          'second'
          'first';

        .Iright,
        .Ileft {
          top: 23rem;
          left: 0;
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
    // text-align: center;
    position: relative;
    transform: translateY(-8rem);

    padding: calc(18rem + 10rem) 1.5rem 2.5rem;
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
    @media (width < ${theme.mediaQueries.mobile}) {
      padding-left: 0;
    }
  `}
`

const StyledContentImagetWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: end;

    @media (width < ${theme.mediaQueries.mobile}) {
      justify-content: center;
    }
  `}
`

const StyledHeading = styled(Typo.Heading1)`
  ${({ theme }) => css`
    max-width: 44rem;
    margin: 0 0 3rem;
    // text-align: left;

    @media (width < ${theme.mediaQueries.mobile}) {
      font-size: ${theme.fonts.sizes['l']};
    }
  `}
`

const StyledText = styled.p`
  ${({ theme }) => css`
    max-width: 34rem;
    margin: 0 0 2rem;
    // text-align: left;
    line-height: 2;

    @media (width < ${theme.mediaQueries.mobile}) {
    }
  `}
`

const StyledImage = styled.img`
  max-width: 100%;
  height: auto;
  transform: rotate(2deg);
`

const StyledIcon = styled.img`
  max-width: 5rem;
  height: auto;
  transform: rotate(2deg);
  position: absolute;
`
