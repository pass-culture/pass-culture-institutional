import React from 'react'
import { BlocksRenderer } from '@strapi/blocks-react-renderer'
import styled, { css } from 'styled-components'

import BlockRendererWithCondition from '../BlockRendererWithCondition'
import { SimpleTextV2Props } from '@/types/props'
import { ContentWrapper } from '@/ui/components/ContentWrapper'
import StyledBlocksRenderer from '@/ui/components/StyledBlocksRenderer'
import { Typo } from '@/ui/components/typographies'
import { isRenderable } from '@/utils/isRenderable'
import { parseText } from '@/utils/parseText'

export function SimpleTextV2(props: SimpleTextV2Props) {
  const { columns, title, text, padding = true } = props

  const isRenderColumns = (): boolean => {
    return columns?.length > 0
  }
  return (
    <Root data-testid="simple-text">
      <BlockRendererWithCondition condition={isRenderable(title)}>
        <StyledHeading2>{title as string}</StyledHeading2>
      </BlockRendererWithCondition>

      <Content
        padding={
          padding
            ? 'padding-left: 8.5%; padding-right: 8.5%;'
            : 'padding-left: 0; padding-right: 0;'
        }>
        <StyledBlocksRenderer>
          <BlocksRenderer content={text} />
        </StyledBlocksRenderer>
        <BlockRendererWithCondition condition={isRenderColumns()}>
          <Columns>
            {columns?.map((col) => (
              <Column key={col.id}>
                {col.title && (
                  <ColumnTitle
                    aria-label={parseText(col.title).accessibilityLabel}>
                    {parseText(col.title).processedText}
                  </ColumnTitle>
                )}
                <StyledBlocksRenderer>
                  <BlocksRenderer content={col.text} />
                </StyledBlocksRenderer>
              </Column>
            ))}
          </Columns>
        </BlockRendererWithCondition>
      </Content>
    </Root>
  )
}

const Root = styled(ContentWrapper)`
  ${({ theme }) => css`
    line-height: 2;
    font-weight: ${({ theme }) => theme.fonts.weights.medium};

    img {
      border-radius: ${theme.radius.sm};
      object-fit: cover;
      aspect-ratio: 1.2;
      display: block;
      margin: 0 auto;
      height: auto;
      width: 100%;
      margin-top: 1.25rem;
      margin-bottom: 1.25rem;
    }

    h2 {
      font-size: 2.5rem;
      font-weight: 600;
      color: ${theme.colors.secondary};
      line-height: 1.3;
    }

    h3 {
      font-size: 2rem;
      font-weight: 600;
      color: ${theme.colors.secondary};
      line-height: 1.3;
    }

    h4 {
      font-size: 1.6rem;
      font-weight: 600;
      color: ${theme.colors.secondary};
      line-height: 1.3;
    }

    h5 {
      font-size: 1.3rem;
      font-weight: 600;
      line-height: 1.3;
    }

    h6 {
      font-size: 1.1rem;
      font-weight: 700;
      line-height: 1.3;
    }

    ul {
      padding-left: 0 rem;
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
      outline-offset: 0.625rem;
      &:hover {
        text-decoration: none;
      }
      &:focus {
        outline: 0.125rem solid ${theme.colors.primary};
      }
    }

    strong {
      font-weight: ${({ theme }) => theme.fonts.weights.bold};
    }

    @media (width < ${theme.mediaQueries.mobile}) {
      padding-left: 1rem;
      padding-right: 1rem;
      margin-bottom: 0;

      line-height: 1.8;

      h2 {
        font-size: 2rem;
      }

      h3 {
        font-size: 1.7rem;
      }

      h4 {
        font-size: 1.3rem;
      }

      h5 {
        font-size: 1.2rem;
      }

      h6 {
        font-size: 1.05rem;
      }

      p,
      ul {
        padding-left: 0;
      }
    }
  `}
`

const Content = styled.div<{ padding: string }>`
  ${({ padding }) => css`
    ${padding}
  `}

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
