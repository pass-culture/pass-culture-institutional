import React from 'react'
import ReactPlayer from 'react-player/youtube'
import styled, { css } from 'styled-components'

interface VideoProps {
  description?: string
  url?: string
}

export function Image(props: VideoProps) {
  return (
    <Root>
      <StyledVideo
        url={props.url}
        light
        width="100%"
        // playIcon={<Play />}
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

    img {
      width: 90%;
      border-radius: 2.5rem;
    }
    p {
      width: 90%;
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
    }
  `}
`
const StyledVideo = styled(ReactPlayer)`
  ${({ theme }) => css`
    @media (width < ${theme.mediaQueries.tablet}) {
    }
  `}
`
