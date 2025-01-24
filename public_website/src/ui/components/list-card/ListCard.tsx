import React from 'react'
import Image from 'next/legacy/image'
import styled, { css } from 'styled-components'

import { NewsFragment, ResourceFragment } from '@/generated/graphql'
import { theme } from '@/theme/theme'
import { Link } from '@/ui/components/Link'
import { formatDate } from '@/utils/formatDate'
import { isRenderable } from '@/utils/isRenderable'

export function ListCard(
  props: (NewsFragment | ResourceFragment) & { type: string }
) {
  const { title, category, date, image, slug, type } = props

  const IMAGE_URL = image && isRenderable(image.url)
  return (
    <Root>
      {IMAGE_URL && (
        <StyledCardImage src={image?.url} alt="" width={385} height={310} />
      )}
      <StyledMeta id={`news-meta-${slug}`}>
        {category} - <span className="visually-hidden">Publié le</span>{' '}
        <time>{formatDate(date)}</time>
      </StyledMeta>
      <StyledCardTitle>
        <StyledCardLink
          href={type?.trim() + '/' + slug}
          aria-describedby={`news-meta-${slug}`}>
          {title}
        </StyledCardLink>
      </StyledCardTitle>
    </Root>
  )
}

const Root = styled.article`
  position: relative;
`

const StyledCardImage = styled(Image)`
  border-radius: ${theme.radius.sm};
  margin-bottom: 1.5rem;
  aspect-ratio: 395/318;
  width: 100%;
  height: auto;
  object-fit: cover;

  @media (width < ${(p) => p.theme.mediaQueries.mobile}) {
    aspect-ratio: 350 / 280;
  }
`

const StyledMeta = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.black};
    opacity: 0.6;
    text-transform: uppercase;
    margin-bottom: 0.5rem;
    font-size: ${theme.fonts.sizes['2xs']};
    font-weight: ${theme.fonts.weights.semiBold};
  `}
`

const StyledCardTitle = styled.h3`
  ${({ theme }) => css`
    font-weight: ${theme.fonts.weights.semiBold};
  `}
`

const StyledCardLink = styled(Link)`
  &::after {
    inset: 0;
    content: '';
    position: absolute;
  }
`
