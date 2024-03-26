import React, { useRef, useState } from 'react'
import { Slide } from 'pure-react-carousel'
import styled, { css } from 'styled-components'

import { Typo } from '../../../ui/components/typographies'
import { APIResponse } from '@/types/strapi'
import { Pause } from '@/ui/components/icons/Pause'
import { Play } from '@/ui/components/icons/Play'
import { getStrapiURL } from '@/utils/apiHelpers'

export type TestimonyCarouselSlideProps = {
  slideIndex: number
  image: APIResponse<'plugin::upload.file'> | null
  title: string
  description: string
  url: string
}

export function TestimonyCarouselSlide({
  slideIndex,
  image,
  title,
  description,
  url,
}: TestimonyCarouselSlideProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const playVideo = () => {
    if (videoRef.current) {
      if (!isPlaying) {
        videoRef.current.play()
        setIsPlaying(true)
      } else {
        videoRef.current.pause()
        setIsPlaying(false)
      }
    }
  }
  return (
    <Root
      index={slideIndex}
      key={title}
      innerClassName="inner"
      role="group"
      aria-roledescription="diapositive">
      <StyledWrapper>
        <button onMouseDown={playVideo}>
          <span className="visually-hidden">
            {isPlaying ? 'Pause' : 'Lecture'}
          </span>
          {!isPlaying ? <Play /> : <Pause />}
        </button>

        {image && (
          <StyledTestimonyVideo
            ref={videoRef}
            poster={
              image.data.attributes.url &&
              getStrapiURL(image.data.attributes.url)
            }>
            <source src={url} />
          </StyledTestimonyVideo>
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

      @media (width < ${theme.mediaQueries.mobile}) {
        margin-right: 0;
      }
    }
  `}
`

const StyledTestimonyVideo = styled.video`
  border-radius: 0.5rem;
  object-fit: cover;
  width: 100%;
  height: auto;

  aspect-ratio: 0.7;
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
