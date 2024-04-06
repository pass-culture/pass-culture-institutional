import React from 'react'
import Image from 'next/image'
import styled, { css } from 'styled-components'

import { APIResponse } from '@/types/strapi'
import { getStrapiURL } from '@/utils/apiHelpers'
interface ImageProps {
  description?: string
  image: APIResponse<'plugin::upload.file'>
  alt: string
}

export function Imageblock(props: ImageProps) {
  return (
    <Root>
      {props.image && (
        <figure>
          <Image
            src={getStrapiURL(props.image.data.attributes.url)}
            alt={props.alt}
            layout={'fill'}
            objectFit={'cover'}
          />
          <figcaption>{props.description}</figcaption>
        </figure>
      )}
    </Root>
  )
}

const Root = styled.div`
  ${({ theme }) => css`
    max-width: 90rem;
    margin: 8rem auto;
    padding: 5rem 4rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;

    img {
      position: absolute;
      border-radius: 2.5rem;
      margin-bottom: 2rem;
    }
    figure {
      width: 100%;
      aspect-ratio: 16 / 9;
      position: relative;
    }
    figcaption {
      position: absolute;
      width: 95%;
      right: 0;
      bottom: -4rem;
      margin: 0 auto;
    }

    @media (width < ${theme.mediaQueries.tablet}) {
      background: none;
      padding: 1.5rem;
      max-width: 90%;
      margin: 2rem auto;
      gap: 1rem;

      img {
        width: 100%;
        border-radius: 1rem;
      }

      figcaption {
        width: 100%;
      }
    }
  `}
`
