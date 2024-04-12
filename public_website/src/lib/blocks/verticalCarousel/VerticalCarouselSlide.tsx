import React from 'react'
import Image from 'next/image'
import { Slide } from 'pure-react-carousel'
import styled, { css } from 'styled-components'

import { Typo } from '../../../ui/components/typographies'
import { APIResponseData } from '@/types/strapi'
import { Link } from '@/ui/components/Link'
import { getStrapiURL } from '@/utils/apiHelpers'

export type VerticalCarouselSlideProps = {
  slideIndex: number
  image: string | { data: APIResponseData<'plugin::upload.file'> | null } | null
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
  const imageUrl =
    typeof image === 'string' ? image : image?.data?.attributes.url

  return (
    <Root
      index={slideIndex}
      key={title}
      innerClassName="inner"
      role="group"
      aria-roledescription="diapositive">
      <StyledLink href={url}>
        {imageUrl && (
          <StyledImageWrapper>
            <Image
              src={getStrapiURL(imageUrl)}
              alt=""
              layout={'fill'}
              objectFit={'cover'}
            />
          </StyledImageWrapper>
        )}
        <StyledTitle>{title}</StyledTitle>
        <Typo.Body>{description}</Typo.Body>
      </StyledLink>
    </Root>
  )
}

const Root = styled(Slide)`
  ${({ theme }) => css`
    /* margin: 0 1rem; */
    &:not(:last-child) {
      margin-right: 2rem;
    }

    @media (width < ${theme.mediaQueries.mobile}) {
      &:not(:last-child) {
        margin-right: 1rem;
      }
      .inner {
        margin: 0;
      }
    }
  `}
`

const StyledTitle = styled(Typo.Heading3)`
  margin: 1.5rem 0 0.25rem;
  width: 90%;
  font-size: ${({ theme }) => theme.fonts.sizes['xl']};
`

const StyledLink = styled(Link)`
  display: block;
`
const StyledImageWrapper = styled.div`
  width: 100%;
  border-radius: 0.5rem;
  position: relative;
  aspect-ratio: 283 / 401;
  border-radius: 0.5rem;
  img {
    border-radius: 0.5rem;
  }
`
