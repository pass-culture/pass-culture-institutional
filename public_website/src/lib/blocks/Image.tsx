import React from 'react'
import styled, { css } from 'styled-components'

import { ComponentBlockImageFragment } from '@/generated/graphql'
import { ContentWrapper } from '@/ui/components/ContentWrapper'
import { getStrapiURL } from '@/utils/apiHelpers'
import { isRenderable } from '@/utils/isRenderable'

export function Imageblock(props: ComponentBlockImageFragment) {
  const { requiredImage, description, requiredAlt } = props
  const caption_description = description && isRenderable(description)

  return (
    <ContentWrapper>
      <Root>
        <figure>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={getStrapiURL(requiredImage.url)}
            alt={requiredAlt}
            fetchPriority="low"
            loading="lazy"
            decoding="async"
          />
          {caption_description && <figcaption>{description}</figcaption>}
        </figure>
      </Root>
    </ContentWrapper>
  )
}

const Root = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;

    padding: 0 8.5%;

    img {
      border-radius: 2.5rem;
      width: 100%;
      object-fit: cover;
    }

    figure {
      width: 100%;
      position: relative;

      display: flex;
      flex-direction: column;
      gap: 2rem;

      font-size: 15px;
      font-weight: 500;
      line-height: 1.6;
    }

    @media (width < ${theme.mediaQueries.tablet}) {
      background: none;
      gap: 1rem;
      padding: 0;

      img {
        width: 100%;
        border-radius: ${theme.radius.sm};
      }

      figure {
        gap: 1.5rem;
      }

      figcaption {
        width: 100%;
      }
    }
  `}
`
