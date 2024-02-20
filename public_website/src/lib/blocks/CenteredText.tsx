import React from 'react'
import styled from 'styled-components'

interface CenteredTextProps {
  Title: string
  Text: string
}

export function CenteredText(props: CenteredTextProps) {
  return (
    <Root data-testid="centered-text">
      {/* TODO: determine heading level */}
      <h2>{props.Title}</h2>
      <p dangerouslySetInnerHTML={{ __html: props.Text }} />
    </Root>
  )
}

const Root = styled.div`
  text-align: center;
  max-width: 52.5rem;
  margin: 5rem auto;

  h2 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    /* TODO: use CSS var */
    color: #320096;
  }

  p {
    font-size: 1.625rem;
    font-weight: 600;
    line-height: 1.7;
  }

  /* TODO: mobile style */
`
