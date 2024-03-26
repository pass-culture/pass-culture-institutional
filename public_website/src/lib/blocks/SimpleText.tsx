import React from 'react'
import styled, { css } from 'styled-components'

import { Typo } from '@/ui/components/typographies'

interface SimpleTextProps {
  title?: string
  text?: string
  isNormal?: boolean
  firstSubTitle?: string
  secondSubTitle?: string
  firstText?: string
  secondText?: string
}

export function SimpleText(props: SimpleTextProps) {
  return (
    <Root data-testid="simple-text">
      <Typo.Heading2>{props.title}</Typo.Heading2>
      <p>{props.text}</p>
      {!props.isNormal && (
        <Columns>
          <Column>
            <ul>
              <li>{props.firstSubTitle}</li>
            </ul>
            <p>{props.firstText}</p>
          </Column>

          <Column>
            <ul>
              <li>{props.secondSubTitle}</li>
            </ul>
            <p>{props.secondText}</p>
          </Column>
        </Columns>
      )}
    </Root>
  )
}

const Root = styled.div`
  ${({ theme }) => css`
    width: 100%;
    max-width: 75rem;
    margin: 5rem auto;

    h2 {
      font-size: 2.5rem;
      margin-bottom: 4rem;
      color: ${theme.colors.secondary};
    }

    p {
      line-height: 1.5;
      font-weight: ${({ theme }) => theme.fonts.weights.medium};
      padding-left: 7.1875rem;
      max-width: 70%;
      word-break: break-word;
    }

    ul {
      list-style-type: circle;
      padding-left: 9.1875rem;
      font-weight: 700;
    }

    @media (width < ${theme.mediaQueries.mobile}) {
      width: 90%;
      max-width: 100%;
      padding-left: 1rem;
      padding-right: 1rem;

      h2 {
        font-size: 1.5rem;
        margin-bottom: 1.5rem;
        max-width: 80%;
      }

      p,
      ul {
        padding-left: 0;
      }
    }
    /* TODO: mobile style */
  `}
`

const Columns = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin-top: 5rem;

    @media (width < ${theme.mediaQueries.mobile}) {
      grid-template-columns: 1fr;
      margin-top: 2rem;
    }
  `}
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`
