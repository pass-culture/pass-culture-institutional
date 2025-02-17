import React from 'react'
import styled, { css } from 'styled-components'

import { Download } from '../icons/Download'
import { ExternalLink } from '../icons/ExternalLink'
import { CTA } from '@/types/CTA'
import { Link } from '@/ui/components/Link'
import { formatDate } from '@/utils/formatDate'
import { isStringAreEquals } from '@/utils/stringAreEquals'

export function ResourceCard(props: {
  title: string
  category?: string
  date: string | Date
  cta: CTA
}) {
  const { title, category, date, cta } = props

  const setIcon = (): React.JSX.Element => {
    if (category && isStringAreEquals(category, 'document')) {
      return <Download />
    }
    return <ExternalLink />
  }

  return (
    <Root>
      <StyledMeta id={`news-meta-${cta.URL}`}>
        {category ?? 'Règlement'} -{' '}
        <span className="visually-hidden">Publié le</span>
        <time>{formatDate(date)}</time>
      </StyledMeta>
      <StyledCardTitle>{title}</StyledCardTitle>
      <StyledCardLink
        href={cta.URL}
        aria-describedby={`ressources-meta-${cta.URL}`}>
        <StyledCardLinkContent>
          {setIcon()}
          {cta.Label}
        </StyledCardLinkContent>
      </StyledCardLink>
    </Root>
  )
}

const Root = styled.article``

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

const StyledCardLinkContent = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: absolute;
  bottom: 20px;
  right: 20px;
`

const StyledCardTitle = styled.h3`
  ${({ theme }) => css`
    font-weight: ${theme.fonts.weights.semiBold};
    color: ${theme.colors.secondary};
    font-size: 26px;
    line-height: 28px;
    letter-spacing: -0.31px;
  `}
`

const StyledCardLink = styled(Link)`
  ${({ theme }) => css`
    color: ${theme.colors.secondary};
    font-size: 14px;
    line-height: 20px;
    letter-spacing: -0.19px;
  `}
`
