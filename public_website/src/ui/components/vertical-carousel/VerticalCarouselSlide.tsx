import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Slide } from 'pure-react-carousel'
import styled, { css } from 'styled-components'

import { Typo } from '../typographies'
import { APIResponse } from '@/types/strapi'
import { getStrapiURL } from '@/utils/apiHelpers'

export type VerticalCarouselSlideProps = {
  slideIndex: number
  image: APIResponse<'plugin::upload.file'> | null
  title: string
  description: string
  url: string
}

export function VerticalCarouselSlide({
  slideIndex,
  image,
  title,
  description,
  url,
}: VerticalCarouselSlideProps) {
  return (
    <Root
      index={slideIndex}
      key={title}
      aria-label={`${title} ${description}`}
      innerClassName="inner"
      role="group"
      aria-roledescription="slide">
      <StyledLink href={url}>
        {image && (
          <StyledImage
            src={
              image.data.attributes.url &&
              getStrapiURL(image.data.attributes.url)
            }
            alt=""
            width={300}
            height={400}
          />
        )}
        <StyledTitle>{title}</StyledTitle>
        <Typo.Body>{description}</Typo.Body>
      </StyledLink>
    </Root>
  )
}

const Root = styled(Slide)`
  ${({ theme }) => css`
    .inner {
      margin-right: 1rem;

      @media (width < ${theme.mediaQueries.mobile}) {
        margin-right: 0;
      }
    }
  `}
`

const StyledImage = styled(Image)`
  border-radius: 0.5rem;
  object-fit: cover;
  width: 100%;
  height: auto;
`

const StyledTitle = styled(Typo.Heading3)`
  margin: 1.5rem 0 0.25rem;
`

const StyledLink = styled(Link)`
  display: block;
`
