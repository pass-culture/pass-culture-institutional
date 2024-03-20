import React from 'react'
import styled, { css } from 'styled-components'

import { APIResponse } from '@/types/strapi'
import { getStrapiURL } from '@/utils/apiHelpers'

interface ImageProps {
  description?: string
  image: APIResponse<'plugin::upload.file'> | null
}

export function Image(props: ImageProps) {
  return (
    <Root>
      <img src={getStrapiURL(props.image?.data.attributes.url)} alt="" />
      <p>{props.description}</p>
    </Root>
  )
}

const Root = styled.div`
  ${({ theme }) => css`
    max-width: 90rem;
    margin: 8rem auto;
    padding: 5rem auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;

    img {
      width: 90%;
      border-radius: 2.5rem;
    }
    p {
      width: 90%;
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

      p {
        width: 100%;
      }
    }
  `}
`
