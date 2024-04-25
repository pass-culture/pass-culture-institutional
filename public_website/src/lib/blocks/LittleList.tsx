import React from 'react'
import styled, { css } from 'styled-components'

import { ContentWrapper } from '@/ui/components/ContentWrapper'
import { OutlinedText } from '@/ui/components/OutlinedText'
import { Typo } from '@/ui/components/typographies'

interface ContentItem {
  id: number
  text: string
  description: string | null
  firstEmoji: string
  secondEmoji: string
}
interface LittleListProps {
  title?: string
  description?: string
  content?: ContentItem[]
}

export function LittleList(props: LittleListProps) {
  return (
    <Root>
      <Columns>
        <Column>
          {props.title && <Typo.Heading2>{props.title}</Typo.Heading2>}
          {props.description && <Description>{props.description}</Description>}
        </Column>

        <Column as="ul">
          {props.content?.map((item) => (
            <ColumnContent key={item.id} as="li">
              <ColumnEmoji>
                <OutlinedText shadow>{item.firstEmoji}</OutlinedText>
                <OutlinedText shadow>{item.secondEmoji}</OutlinedText>
              </ColumnEmoji>

              <ColumnText>
                <p>{item.text}</p>
                {item.description && <p>{item.description}</p>}
              </ColumnText>
            </ColumnContent>
          ))}
        </Column>
      </Columns>
    </Root>
  )
}

const Root = styled(ContentWrapper)`
  ${({ theme }) => css`
    @media (width < ${theme.mediaQueries.mobile}) {
      h2 {
        font-size: 1.5rem;
      }
    }
  `}
`

const Columns = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-content: space-between;
    margin-top: 5rem;

    @media (width < ${theme.mediaQueries.tablet}) {
      grid-template-columns: 1fr;
    }

    @media (width < ${theme.mediaQueries.mobile}) {
      gap: 3rem;
      display: flex;
      flex-direction: column;
      margin-top: 2rem;
    }
  `}
`

const Column = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    &:first-child {
      padding-right: 6rem;
      margin-bottom: 3rem;

      @media (width < ${theme.mediaQueries.tablet}) {
        padding-right: 0;
      }
      @media (width < ${theme.mediaQueries.mobile}) {
        margin-bottom: 0;
      }
    }
  `}
`

const Description = styled(Typo.Body)`
  font-size: ${(p) => p.theme.fonts.sizes.s};
`

const ColumnContent = styled.div`
  ${({ theme }) => css`
    display: flex;
    gap: 2rem;
    @media (width < ${theme.mediaQueries.mobile}) {
      flex-direction: column;
      gap: 0;
    }
  `}
`

const ColumnEmoji = styled.div`
  ${({ theme }) => css`
    min-width: 8rem;
    position: relative;

    span {
      position: absolute;
      top: 0;
      font-size: ${theme.fonts.sizes['7xl']};
    }

    span:nth-child(1) {
      left: 1.6rem;
      transform: rotate(-3deg);
    }

    span:nth-child(2) {
      right: 1rem;
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
    border-bottom: solid 1px ${theme.colors.black}20;
    flex: 1;

    p:nth-child(1) {
      font-weight: ${theme.fonts.weights.bold};
      line-height: 2;
    }

    p:nth-child(2) {
      line-height: 2;
      font-weight: ${theme.fonts.weights.medium};
    }

    @media (width < ${theme.mediaQueries.mobile}) {
      max-width: 100%;
      margin-bottom: 1rem;

      p:nth-child(1) {
        max-width: 100%;
      }
    }
  `}
`
