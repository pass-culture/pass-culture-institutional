import React from 'react'
import styled, { css } from 'styled-components'
import { Typo } from '@/ui/components/typographies'

interface SimpleTextProps {
  Title?: string
  Text?: string
  IsNormal?: boolean
  FirstSubTitle?: string
  SecondSubTitle?: string

  FirstText?: string
  SecondText?: string
}

export function SimpleText(props: SimpleTextProps) {
  return (
    <React.Fragment>
      <Root data-testid="simple-text">
        <Typo.Heading2>{props.Title}</Typo.Heading2>
        {/* TODO: 2 columns variant */}
        <p>{props.Text}</p>
        {!props.IsNormal && (
          <Columns>
            <Column>
              <ul>
                <li>{props.FirstSubTitle}</li>
              </ul>
              <p>{props.FirstText}</p>
            </Column>

            <Column>
              <ul>
                <li>{props.SecondSubTitle}</li>
              </ul>
              <p>{props.SecondText}</p>
            </Column>
          </Columns>
        )}
      </Root>
      <React.Fragment/>
  )
}

const Root = styled.div`
  ${({ theme }) => css`
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
