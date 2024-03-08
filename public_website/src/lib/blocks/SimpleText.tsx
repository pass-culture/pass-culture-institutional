import React from 'react'
import styled from 'styled-components'

interface SimpleTextProps {
  Title: string
  Text: string
}

export function SimpleText(props: SimpleTextProps) {
  return (
    <Root data-testid="simple-text">
      <h2>{props.Title}</h2>
      {/* TODO: 2 columns variant */}
      <p>{props.Text}</p>
    </Root>
  )
}

const Root = styled.div`
  width: 100%;
  max-width: 75rem;
  margin: 5rem auto;

  h2 {
    /* TODO: variabilize ? */
    font-size: 2.5rem;
    margin-bottom: 4rem;
    /* TODO: use CSS var */
    color: #320096;
  }

  p {
    line-height: 1.5;
    font-weight: ${({ theme }) => theme.fonts.weights.medium};
    padding-left: 7.1875rem;
  }

  /* TODO: mobile style */
`
