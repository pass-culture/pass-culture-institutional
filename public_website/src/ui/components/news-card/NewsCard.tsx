import React from 'react'
import Image from 'next/image'
import styled, { css } from 'styled-components'

import { NewsCardProps } from '@/types/props'
import { Link } from '@/ui/components/Link'
import { formatDate } from '@/utils/formatDate'

export function NewsCard(props: NewsCardProps) {
  const { title, category, date, imageUrl, slug } = props

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
  ${({ theme }) => css`
    position: relative;
    // width: 24rem;

    max-width: 24rem;
    width: 100%;
    @media (width < ${theme.mediaQueries.mobile}) {
      //  width: 75vw;
      width: 100%;
      max-width: 100%;
    }
  `}
`

const StyledImage = styled(Image)`
  ${({ theme }) => css`
    border-radius: ${theme.radius.sm};
    margin-bottom: 1.5rem;
    object-fit: cover;
    aspect-ratio: 1.2;
    height: auto;
    width: 100%;
  `}
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
