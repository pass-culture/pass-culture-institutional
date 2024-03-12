import React from 'react'
import styled, { css } from 'styled-components'

import { Typo } from '@/ui/components/typographies'

interface ContentItem {
  id: number
  Simple: string
  Description: string | null
  FirstEmoji: string
  SecondEmoji: string
}
interface LittleListProps {
  title?: string
  description?: string
  content?: ContentItem[]
  withDescription?: boolean
}

export function LittleList(props: LittleListProps) {
  return (
    <Root data-testid="simple-text">
      {/* <Typo.Heading2>{props.Title}</Typo.Heading2>   */}
      <Columns>
        <Column>
          <Typo.Heading2>{props.title}</Typo.Heading2>
          <p>{props.description}</p>
        </Column>

        <Column>
          {props.content?.map((item) => (
            <ColumnContent key={item.id}>
              <ColumnEmoji>
                <span>{item.firstEmoji}</span>
                <span>{item.secondEmoji}</span>
              </ColumnEmoji>
              <ColumnText>
                <p>{item.simple}</p>
                {props.withDescription && <p>{item.description}</p>}
              </ColumnText>
            </ColumnContent>
          ))}
        </Column>
      </Columns>
    </Root>
  )
}

const Root = styled.div`
  ${({ theme }) => css`
    width: 100%;
    max-width: 90rem;
    margin: 5rem auto;

    // h2 {
    //   /* TODO: variabilize ? */
    //   font-size: 2.5rem;
    //   margin-bottom: 4rem;
    //   /* TODO: use CSS var */
    //   color: #320096;
    // }

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
    }
    /* TODO: mobile style */
  `}
`

const Columns = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    // grid-template-columns: 1fr 1fr;
    gap: 4rem;
    margin-top: 5rem;

    @media (width < ${theme.mediaQueries.mobile}) {
      //   grid-template-columns: 1fr;
      flex-direction: column;
      margin-top: 2rem;
    }
  `}
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const ColumnContent = styled.div`
  ${({ theme }) => css`
    display: flex;
    //   grid-template-columns: 1fr fr;
    width: fit-content;
    @media (width < ${theme.mediaQueries.mobile}) {
      flex-direction: column;
    }
  `}
`

const ColumnEmoji = styled.div`
  ${({ theme }) => css`
    font-size: 2rem;
    min-width: 6rem;
    position: relative;

    span {
      position: absolute;
      top: 0;
    }

    span:nth-child(1) {
      left: 0;
      transform: rotate(-3deg);
    }

    span:nth-child(2) {
      right: 40px;
      transform: rotate(4deg);
    }

    @media (width < ${theme.mediaQueries.mobile}) {
      min-height: 6rem;
      min-width: 9rem;
      font-size: 3rem;

      span:nth-child(1) {
        left: 0;
        transform: rotate(-3deg);
      }

      span:nth-child(2) {
        left: 40px;
        transform: rotate(4deg);
      }
    }
  `}
`

const ColumnText = styled.div`
  ${({ theme }) => css`
    padding-bottom: 1.5rem;
    min-width: 70%;
    max-width: 70%;

    border-bottom: solid 1px #00000020;
    p:nth-child(1) {
      font-weight: ${theme.fonts.weights.bold};
      max-width: 80%;
      line-height: 2;
    }

    p:nth-child(2) {
      //   max-width: 75%;
      line-height: 2;
      font-weight: ${theme.fonts.weights.medium};
    }

    @media (width < ${theme.mediaQueries.mobile}) {
      max-width: 100%;
      margin-bottom: 2rem;
      p:nth-child(1) {
        max-width: 100%;
      }
    }
  `}
`
