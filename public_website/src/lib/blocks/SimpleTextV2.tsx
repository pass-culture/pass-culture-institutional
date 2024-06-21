import React from 'react'
import {
  type BlocksContent,
  BlocksRenderer,
} from '@strapi/blocks-react-renderer'
import styled, { css } from 'styled-components'

import { ContentWrapper } from '@/ui/components/ContentWrapper'
import { Typo } from '@/ui/components/typographies'
import { parseText } from '@/utils/parseText'

interface SimpleTextV2Props {
  title?: string
  text: BlocksContent
  columns: {
    id: number
    title: string
    text: BlocksContent
  }[]
}

export function SimpleTextV2(props: SimpleTextV2Props) {
  return (
    <Root data-testid="simple-text">
      {props.title && <StyledHeading2>{props.title}</StyledHeading2>}
      <Content>
        <BlocksRenderer content={props.text} />
        {props.columns.length > 0 && (
          <Columns>
            {props.columns.map((col) => (
              <Column key={col.id}>
                <ColumnTitle
                  aria-label={parseText(col.title).accessibilityLabel}>
                  {parseText(col.title).processedText}
                </ColumnTitle>
                <BlocksRenderer content={col.text} />
              </Column>
            ))}
          </Columns>
        )}
      </Content>
    </Root>
  )
}

const Root = styled(ContentWrapper)`
  ${({ theme }) => css`
    line-height: 2;
    font-weight: ${({ theme }) => theme.fonts.weights.medium};

    margin-top: 2.5rem;
    margin-bottom: 2.5rem;

    h2 {
      font-size: 2.5rem;
      margin-bottom: 2rem;
      color: ${theme.colors.secondary};
    }

    ul {
      list-style-type: disc;
      padding-left: 2rem;
      list-style-position: inside;
    }

    p {
      word-break: break-word;

      ul {
        margin-top: 3rem;
        padding-left: 2rem;
      }
    }

    a {
      color: ${theme.colors.primary}!important;
      text-decoration: underline;
      font-weight: 600;
      outline-offset: 10px;
      &:hover {
        text-decoration: none;
      }
      &:focus {
        outline: 2px solid ${theme.colors.primary};
      }
    }

    strong {
      font-weight: ${({ theme }) => theme.fonts.weights.bold};
    }

    @media (width < ${theme.mediaQueries.mobile}) {
      padding-left: 1rem;
      padding-right: 1rem;

      h2 {
        font-size: 1.5rem;
        margin-bottom: 1.5rem;
      }

      p,
      ul {
        padding-left: 0;
      }
    }
  `}
`

const Content = styled.div`
  padding-left: 8.5%;
  padding-right: 8.5%;

  @media (width < ${({ theme }) => theme.mediaQueries.mobile}) {
    padding-left: 0;
    padding-right: 0;
  }
`

const Columns = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin-top: 2rem;

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

const ColumnTitle = styled.h3`
  display: list-item;
  list-style-type: disc;
  list-style-position: inside;
  padding-left: 0.5rem;
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
`

const StyledHeading2 = styled(Typo.Heading2)`
  @media (width < ${({ theme }) => theme.mediaQueries.tablet}) {
    padding-left: 3rem;
  }
  @media (width < ${({ theme }) => theme.mediaQueries.mobile}) {
    padding-left: 0;
  }
`
