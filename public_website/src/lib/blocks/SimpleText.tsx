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
      {props.title && (
        <Typo.Heading2 dangerouslySetInnerHTML={{ __html: props.title }} />
      )}

      {props.text && <p dangerouslySetInnerHTML={{ __html: props.text }} />}
      {!props.isNormal && (
        <Columns>
          <Column>
            <ul>
              {props.firstSubTitle && (
                <li
                  dangerouslySetInnerHTML={{
                    __html: props.firstSubTitle,
                  }}></li>
              )}
            </ul>
            {props.firstText && (
              <p dangerouslySetInnerHTML={{ __html: props.firstText }}></p>
            )}
          </Column>

          <Column>
            <ul>
              {props.secondSubTitle && (
                <li
                  dangerouslySetInnerHTML={{
                    __html: props.secondSubTitle,
                  }}></li>
              )}
            </ul>
            {props.secondText && (
              <p dangerouslySetInnerHTML={{ __html: props.secondText }}></p>
            )}
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
    ul {
      list-style-type: circle;
      padding-left: 9.1875rem;
      font-weight: 700;
    }

    p {
      line-height: 1.5;
      font-weight: ${({ theme }) => theme.fonts.weights.medium};
      padding-left: 7.1875rem;
      max-width: 70%;
      word-break: break-word;

      ul {
        margin-top: 3rem;
        padding-left: 2rem;
      }
    }

    a {
      color: ${theme.colors.primary}!important;
      text-decoration: underline;
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
      p {
        max-width: 90%;
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
