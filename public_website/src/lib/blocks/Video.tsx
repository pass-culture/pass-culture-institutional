import React from 'react'
import ReactPlayer from 'react-player'
import styled, { css } from 'styled-components'

interface VideoProps {
  description?: string
  url?: string
}

export function Video(props: VideoProps) {
  return (
    <Root>
      <StyledVideo
        url={props.url}
        light
        width="100%"
        controls={true}
        height="100%"
      />
      <p>{props.description}</p>
    </Root>
  )
}

const Root = styled.div`
  ${({ theme }) => css`
    max-width: 90rem;
    margin: 8rem auto;
    padding: 5rem auto;
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
        border-radius: 2rem;
        height: 12rem !important;
      }
    }
  `}
`

const StyledVideo = styled(ReactPlayer)`
  max-width: 100%;
  height: auto;
  border-radius: 2.5rem;
`
