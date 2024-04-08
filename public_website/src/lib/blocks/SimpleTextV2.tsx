import React from 'react'
import {
  type BlocksContent,
  BlocksRenderer,
} from '@strapi/blocks-react-renderer'
import styled, { css } from 'styled-components'

import { Typo } from '@/ui/components/typographies'

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
      {props.title && (
        <Typo.Heading2 dangerouslySetInnerHTML={{ __html: props.title }} />
      )}

      <Content>
        <BlocksRenderer content={props.text} />

        {props.columns.length > 0 && (
          <Columns>
            {props.columns.map((col) => (
              <Column key={col.id}>
                <ColumnTitle
                  dangerouslySetInnerHTML={{
                    __html: col.title,
                  }}
                />
                <BlocksRenderer content={col.text} />
              </Column>
            ))}
          </Columns>
        )}
      </Content>
    </Root>
  )
}

const Root = styled.div`
  ${({ theme }) => css`
    width: 100%;
    max-width: 75rem;
    margin: 5rem auto;

    line-height: 2;
    font-weight: ${({ theme }) => theme.fonts.weights.medium};

    h2 {
      font-size: 2.5rem;
      margin-bottom: 4rem;
      color: ${theme.colors.secondary};
    }

    ul {
      list-style-type: disc;
      padding-left: 2rem;
    }

    p {
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

    strong {
      font-weight: ${({ theme }) => theme.fonts.weights.bold};
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
  `}
`

const Content = styled.div`
  padding-left: 7.1875rem;

  & > *:not(:last-child) {
    margin-bottom: 2rem;
  }

  @media (width < ${({ theme }) => theme.mediaQueries.mobile}) {
    padding-left: 0;
  }
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

const ColumnTitle = styled.h3`
  display: list-item;
  list-style-type: disc;
  list-style-position: inside;
  padding-left: 0.5rem;
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
`
