import React from 'react'
import styled, { css } from 'styled-components'

import { Link } from '../Link'
import { ComponentCommonLinkFragment } from '@/generated/graphql'

const SitemapLinkItem = ({
  link,
  sectionLabel = '',
}: {
  link: ComponentCommonLinkFragment
  sectionLabel: string
}) => (
  <li key={link.Label}>
    <SitemapLink
      href={link.URL}
      aria-label={
        sectionLabel ? `${link.Label} - section ${sectionLabel}` : link.Label
      }>
      {link.Label.trim()}
    </SitemapLink>
  </li>
)
export default SitemapLinkItem

const SitemapLink = styled(Link)`
  ${({ theme }) => css`
    text-decoration: underline;
    text-underline-offset: 0.2em;
    line-height: 1.8;
    padding: 0.2rem 0.4rem;
    margin: -0.2rem -0.4rem;

    &:hover,
    &:focus-visible {
      text-decoration: underline;
      color: ${theme.colors.primary};
    }
  `}
`
