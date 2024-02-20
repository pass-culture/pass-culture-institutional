import React from 'react'
import styled, { css } from 'styled-components'

interface CenteredTextProps {
  Title: string
  Text: string
}

export function CenteredText(props: CenteredTextProps) {
  return (
    <Root data-testid="centered-text">
      <h2>{props.Title}</h2>
      <p dangerouslySetInnerHTML={{ __html: props.Text }} />
    </Root>
  )
}

const Root = styled.div`
  ${({ theme }) => css`
    text-align: center;
    max-width: 52.5rem;
    margin: 0 auto;
    padding: 1.5rem;

    h2 {
      font-size: ${theme.fonts.sizes['6xl']};
      font-weight: ${theme.fonts.weights.bold};
      margin-bottom: 1.5rem;
      color: ${theme.colors.secondary};

      @media (width < ${theme.mediaQueries.mobile}) {
        font-size: ${theme.fonts.sizes['3xl']};
      }
    }

    p {
      font-size: ${theme.fonts.sizes['4xl']};
      font-weight: ${theme.fonts.weights.semiBold};
      line-height: 1.7;

      @media (width < ${theme.mediaQueries.mobile}) {
        font-size: ${theme.fonts.sizes.xl};
      }
    }
  `}
`
