import React from 'react'
import { BlocksRenderer } from '@strapi/blocks-react-renderer'
import styled, { css } from 'styled-components'

import BlockRendererWithCondition from '../BlockRendererWithCondition'
import { Video } from './Video'
import { ComponentBlockColumnsTextFragment } from '@/generated/graphql'
import { ContentWrapper } from '@/ui/components/ContentWrapper'
import { Typo } from '@/ui/components/typographies'
import { isRenderable } from '@/utils/isRenderable'
import { parseText } from '@/utils/parseText'

export function SimpleTextWithMedia(props: ComponentBlockColumnsTextFragment) {
  const { columns, requiredTitle, video } = props

  const isRenderColumns = (): boolean => {
    return (columns?.length ?? 0) > 0
  }

  return (
    <Root data-testid="simple-text-with-media">
      <BlockRendererWithCondition condition={isRenderable(requiredTitle)}>
        <StyledHeading2>{requiredTitle as string}</StyledHeading2>
      </BlockRendererWithCondition>
      <Content>
        <BlockRendererWithCondition condition={isRenderColumns()}>
          <Columns>
            {columns
              ?.filter((col) => col !== null)
              .map((col) => (
                <Column key={col.id}>
                  {col?.title && (
                    <ColumnTitle
                      aria-label={parseText(col.title).accessibilityLabel}>
                      {parseText(col.title).processedText}
                    </ColumnTitle>
                  )}
                  {col?.text && <BlocksRenderer content={col.text} />}
                </Column>
              ))}
          </Columns>
        </BlockRendererWithCondition>
        {video && <Video {...video} />}
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
      list-style-type: none;
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
      margin-top: 1.875rem;
      margin-bottom: 1.875rem;
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
