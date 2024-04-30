import React from 'react'
import { Slide } from 'pure-react-carousel'
import styled, { css } from 'styled-components'

import { APIResponse } from '@/types/strapi'
import { getStrapiURL } from '@/utils/apiHelpers'

type LogoCarouselSlideProps = {
  slideIndex: number
  image: APIResponse<'plugin::upload.file'> | undefined | null
}

export function LogoCarouselSlide({
  slideIndex,
  image,
}: LogoCarouselSlideProps) {
  return (
    <Root
      index={slideIndex}
      key={image?.data.attributes.alternativeText}
      innerClassName="inner"
      aria-roledescription="diapositive">
      <StyledLink>
        <StyledImageSimple
          alt={image?.data.attributes.alternativeText}
          src={getStrapiURL(image?.data.attributes.url)}></StyledImageSimple>
      </StyledLink>
    </Root>
  )
}

const Root = styled(Slide)`
  ${({ theme }) => css`
    .inner {
      margin-right: 1rem;

      @media (width < ${theme.mediaQueries.tablet}) {
        margin-right: 0;
      }
    }
  `}
`

const StyledLink = styled.div`
  ${({ theme }) => css`
    display: block;
    background-color: ${theme.colors.lightBlue};
    border-radius: 0.3rem;
    padding: 0.5rem 1.4rem 0.3rem;
    height: 100%;
  `}
`

const StyledImageSimple = styled.img`
  object-fit: contain;
  width: 100%;
  height: 100%;
  height: 6rem;
`
