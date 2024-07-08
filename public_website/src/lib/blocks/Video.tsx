import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player/youtube'
import styled, { css } from 'styled-components'

import { VideoProps } from '@/types/props'
import { ContentWrapper } from '@/ui/components/ContentWrapper'

export function Video(props: VideoProps) {
  const { description, url, alt } = props
  const [isMounted, setIsMounted] = useState<boolean>(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <ContentWrapper>
      <Root suppressHydrationWarning $noMargin>
        {isMounted && url && (
          <StyledVideo
            url={url}
            width="100%"
            controls
            height="100%"
            alt={alt}
          />
        )}
        {description && <Description>{description}</Description>}
      </Root>
    </ContentWrapper>
  )
}

const Root = styled.div<{ $noMargin?: boolean }>`
  ${({ theme, $noMargin }) => css`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    max-width: 1000px;
    margin: 0 auto;

    ${$noMargin &&
    css`
      padding: 0;
    `}

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
    border-radius: 0.75rem;
    overflow: hidden;
    @media (width < ${theme.mediaQueries.mobile}) {
      border-radius: 0.25rem;
    }
  `}
`

// const StyledPlay = styled(Play)`
//   @media (width < ${(p) => p.theme.mediaQueries.mobile}) {
//     width: 4rem;
//     height: 4rem;
//   }
// `
