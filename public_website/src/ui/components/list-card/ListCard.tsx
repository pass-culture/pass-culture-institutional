import React from 'react'
import Image from 'next/image'
import styled, { css } from 'styled-components'

import { ListCardProps } from '@/types/props'
import { Link } from '@/ui/components/Link'
import { formatDate } from '@/utils/formatDate'

export function ListCard(props: ListCardProps) {
  const { title, category, date, imageUrl, slug, type } = props

  return (
    <Root>
      {imageUrl && (
        <StyledCardImage src={imageUrl} alt="" width={385} height={310} />
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
  border-radius: 1rem;
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
