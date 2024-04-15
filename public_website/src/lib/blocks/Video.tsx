import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player/youtube'
import styled, { css } from 'styled-components'

import { APIResponse } from '@/types/strapi'
import { ContentWrapper } from '@/ui/components/ContentWrapper'
import { Play } from '@/ui/components/icons/Play'
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
    <ContentWrapper>
      <Root suppressHydrationWarning={true}>
        {isMounted && (
          <StyledVideo
            light={
              props.image
                ? getStrapiURL(props.image?.data.attributes.url)
                : true
            }
            url={props.url}
            width="100%"
            controls={true}
            height="100%"
            alt={props.alt}
            playIcon={<StyledPlay />}
          />
        )}
        <Description>{props.description}</Description>
      </Root>
    </ContentWrapper>
  )
}

const Root = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    .react-player__preview {
      border-radius: 2rem;
      aspect-ratio: 16 / 9;
    }

    padding: 0 8.5%;

    @media (width < ${theme.mediaQueries.tablet}) {
      background: none;
      padding: 0;

      img {
        width: 100%;
        border-radius: 1rem;
      }

      .react-player__preview {
        border-radius: 1rem;
      }
    }
  `}
`

const Description = styled.p`
  font-size: ${(p) => p.theme.fonts.sizes.s};
  font-weight: 500;
  line-height: 1.6;
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

const StyledPlay = styled(Play)`
  @media (width < ${(p) => p.theme.mediaQueries.mobile}) {
    width: 4rem;
    height: 4rem;
  }
`
