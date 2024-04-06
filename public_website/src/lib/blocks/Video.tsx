import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player/youtube'
import styled, { css } from 'styled-components'

import { APIResponse } from '@/types/strapi'
import { getStrapiURL } from '@/utils/apiHelpers'

interface VideoProps {
  description?: string
  url?: string
  alt?: string
  image?: APIResponse<'plugin::upload.file'> | null
}

export function Video(props: VideoProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <Root suppressHydrationWarning={true}>
      {isMounted && (
        <StyledVideo
          light={
            props.image ? getStrapiURL(props.image?.data.attributes.url) : true
          }
          url={props.url}
          width="100%"
          controls={true}
          height="100%"
          alt={props.alt}
        />
      )}
      <p>{props.description}</p>
    </Root>
  )
}

const Root = styled.div`
  ${({ theme }) => css`
    max-width: 90rem;
    margin: 8rem auto;
    padding: 5rem 4rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;

    p {
      width: 90%;
    }

    .react-player__preview {
      border-radius: 2rem;
      height: 50rem !important;
    }

    @media (width < ${theme.mediaQueries.tablet}) {
      background: none;
      padding: 1.5rem;
      max-width: 90%;
      margin: 2rem auto;
      gap: 1rem;

      img {
        width: 100%;
        border-radius: 1rem;
      }

      p {
        width: 100%;
      }

      .react-player__preview {
        max-width: 100%;
        border-radius: 1rem;
        height: 25rem !important;
        aspect-ratio: 16 / 9;
      }
    }

    @media (width < ${theme.mediaQueries.mobile}) {
      .react-player__preview {
        height: 12rem !important;
      }
    }
  `}
`

const StyledVideo = styled(ReactPlayer)`
  ${({ theme }) => css`
    max-width: 100%;
    aspect-ratio: 16 / 9;
    border-radius: 2.5rem;
    @media (width < ${theme.mediaQueries.mobile}) {
      border-radius: 1rem;
    }
  `}
`
