import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styled, { css } from 'styled-components'

import { formatDate } from '@/utils/formatDate'

type NewsCardProps = {
  title: string
  category: string
  date: Date | string
  imageUrl: string | null
  slug: string
}

export function NewsCard({
  title,
  category,
  date,
  imageUrl,
  slug,
}: NewsCardProps) {
  return (
    <Root>
      {imageUrl && (
        <StyledImage src={imageUrl} alt="" width={385} height={310} />
      )}
      <StyledMeta id={`news-meta-${slug}`}>
        {category} - <span className="visually-hidden">Publié le</span>{' '}
        <time>{formatDate(date)}</time>
      </StyledMeta>
      <StyledTitle>
        <StyledLink href={slug} aria-describedby={`news-meta-${slug}`}>
          {title}
        </StyledLink>
      </StyledTitle>
    </Root>
  )
}

const Root = styled.article`
  position: relative;
`

const StyledImage = styled(Image)`
  border-radius: 1rem;
  margin-bottom: 1.5rem;
  object-fit: cover;
  aspect-ratio: 1.2;
  height: auto;
  min-width: 100%;
`

const StyledMeta = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.black};
    opacity: 0.6;
    font-size: ${theme.fonts.sizes['2xs']};
    font-weight: ${theme.fonts.weights.semiBold};
    text-transform: uppercase;
    margin-bottom: 0.5rem;
  `}
`

const StyledTitle = styled.h3`
  ${({ theme }) => css`
    font-weight: ${theme.fonts.weights.semiBold};
  `}
`

const StyledLink = styled(Link)`
  &::after {
    content: '';
    position: absolute;
    inset: 0;
  }
`
