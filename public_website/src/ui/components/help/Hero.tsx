import React from 'react'
import styled, { css } from 'styled-components'

import { Button } from '../button/Button'
import { Typo } from '../typographies'
import { APIResponseData } from '@/types/strapi'
import { getStrapiURL } from '@/utils/apiHelpers'

type HeroProps = {
  title: string
  text: string
  image: APIResponseData<'plugin::upload.file'> | null
  //   subTitle: string
  //   cta: { Label: string; URL: string }
  //   firstEmoji: string
  //   secondEmoji: string
  //   thirdEmoji: string
  //   fourthEmoji: string
  //   images: APIResponseData<'plugin::upload.file'>[] | null
}

export function Hero({ title, text, image }: HeroProps) {
  return (
    <Root>
      <StyledContentWrapper>
        <StyledContentTextWrapper>
          <StyledHeading dangerouslySetInnerHTML={{ __html: title }} />
          <StyledText>{text}</StyledText>
        </StyledContentTextWrapper>
        <StyledContentImagetWrapper>
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
    transform: translateY(-8rem);
    overflow: hidden;

    @media (width < ${theme.mediaQueries.mobile}) {
      transform: translateY(-7rem);
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
    grid-template-columns: 1.25fr 1fr;
    gap: 1.5rem;
    @media (width < ${theme.mediaQueries.mobile}) {
      grid-template-columns: 1fr;
      text-align: center;
      padding: calc(10rem + 10rem) 1.5rem 2.5rem;
    }
  `}
`

const StyledContentTextWrapper = styled.div`
  ${({ theme }) => css`
    padding-left: 2rem;
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
      font-size: ${theme.fonts.sizes['5xl']};
    }
  `}
`

const StyledText = styled.p`
  ${({ theme }) => css`
    max-width: 34rem;
    margin: 0 0 2rem;
    // text-align: left;

    @media (width < ${theme.mediaQueries.mobile}) {
    }
  `}
`

const StyledImage = styled.img`
  ${({ theme }) => css`
    max-width: 100%;
    height: auto;
  `}
`
