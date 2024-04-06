import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player/youtube'
import { Slide } from 'pure-react-carousel'
import styled, { css } from 'styled-components'

import { Typo } from '../../../ui/components/typographies'
import { APIResponse } from '@/types/strapi'
import { Play } from '@/ui/components/icons/Play'
import { getStrapiURL } from '@/utils/apiHelpers'

export type ExperienceVideoCarouselSlideProps = {
  slideIndex: number
  image: APIResponse<'plugin::upload.file'> | null
  title: string
  description: string
  url: string
}

export function ExperienceVideoCarouselSlide({
  slideIndex,
  image,
  title,
  description,
  url,
}: ExperienceVideoCarouselSlideProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <Root
      index={slideIndex}
      key={title}
      innerClassName="inner"
      aria-roledescription="diapositive">
      <StyledWrapper>
        {image && isMounted && (
          <StyledExperienceVideo
            light={image ? getStrapiURL(image?.data.attributes.url) : true}
            url={url}
            width="100%"
            controls={false}
            height="100%"
            alt={description}
            playIcon={<StyledPlayIcon />}
          />
        )}
        <StyledTitle>{title}</StyledTitle>
        <Typo.Body>{description}</Typo.Body>
      </StyledWrapper>
    </Root>
  )
}

const Root = styled(Slide)`
  ${({ theme }) => css`
    .inner {
      margin-right: 1rem;
      .react-player__preview {
        border-radius: 1rem;
      }
      @media (width < ${theme.mediaQueries.mobile}) {
        margin-right: 0;
      }
    }
  `}
`

const StyledExperienceVideo = styled(ReactPlayer)`
  border-radius: 0.5rem;
  object-fit: cover;
  width: 100%;
  height: auto;

  aspect-ratio: 1.5;
`
const StyledTitle = styled(Typo.Heading3)`
  margin: 1.5rem 0 0.25rem;
`

const StyledWrapper = styled.div`
  display: block;
  position: relative;

  button {
    position: absolute;
    left: 1rem;
    bottom: 8rem;
    z-index: 15;
  }
`

const StyledPlayIcon = styled(Play)`
  ${({ theme }) => css`
    position: absolute;
    left: 2rem;
    bottom: 9rem;
    z-index: 15;

    @media (width < ${theme.mediaQueries.mobile}) {
      scale: 0.5;
      left: 0;

      bottom: 6rem;
    }
  `}
`
