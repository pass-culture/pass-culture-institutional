import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Slide } from 'pure-react-carousel'
import styled, { css } from 'styled-components'
import { Play } from '@/ui/components/icons/Play'
import { Typo } from '../../../ui/components/typographies'
import { APIResponse } from '@/types/strapi'
import { getStrapiURL } from '@/utils/apiHelpers'
import { useRef } from 'react'
import { Pause } from '@/ui/components/icons/Pause'

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
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState<Boolean>(false)
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
  const handleEnter = () => {}
  return (
    <Root
      index={slideIndex}
      key={title}
      innerClassName="inner"
      role="group"
      aria-roledescription="diapositive">
      <StyledWrapper>
        <button onMouseDown={playVideo}>
          {!isPlaying ? <Play /> : <Pause />}
        </button>

        {image && (
          <StyledVideo
            ref={videoRef}
            poster={
              image.data.attributes.url &&
              getStrapiURL(image.data.attributes.url)
            }>
            <source src="https://upload.wikimedia.org/wikipedia/commons/transcoded/d/db/Fractal-zoom-1-15-rupture.ogv/Fractal-zoom-1-15-rupture.ogv.240p.vp9.webm" />
          </StyledVideo>
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

const StyledImage = styled(Image)`
  border-radius: 0.5rem;
  object-fit: cover;
  width: 100%;
  height: auto;
`

const StyledVideo = styled.video`
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

// const StyledPlay = styled(Play)`
//   position: absolute;
//   top: 54rem;
// `
