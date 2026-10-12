import React from 'react'
import styled, { css } from 'styled-components'

import BlockRendererWithCondition from '../BlockRendererWithCondition'
import { IconLinksListProps } from '@/types/props'
import { ContentWrapper } from '@/ui/components/ContentWrapper'
import { Link } from '@/ui/components/Link'
import { LinkIcon } from '@/ui/components/link-icon/LinkIcon'
import { OutlinedText } from '@/ui/components/OutlinedText'
import { Typo } from '@/ui/components/typographies'
import { isRenderable } from '@/utils/isRenderable'

/**
 * List of items with an emoji, a title, a description and an optional link.
 * Its design starts from the home eligibility list but is independent from it.
 */
export function IconLinksList(props: IconLinksListProps) {
  const { title, items } = props

  return (
    <ContentWrapper>
      <StyledListContainer>
        <BlockRendererWithCondition condition={isRenderable(title)}>
          <StyledListHeading>{title as string}</StyledListHeading>
        </BlockRendererWithCondition>
        <StyledList>
          {items?.map((item) => (
            <StyledListItem key={item.id} $isLink={isRenderable(item.url)}>
              <StyledEmoji>{item.emoji}</StyledEmoji>
              <StyledTitle>
                {item.url ? (
                  <StyledLink href={item.url}>
                    {item.title}
                    <LinkIcon url={item.url} />
                  </StyledLink>
                ) : (
                  item.title
                )}
              </StyledTitle>
              <BlockRendererWithCondition
                condition={isRenderable(item.description)}>
                <StyledDescription>{item.description}</StyledDescription>
              </BlockRendererWithCondition>
            </StyledListItem>
          ))}
        </StyledList>
      </StyledListContainer>
    </ContentWrapper>
  )
}

const StyledListContainer = styled.div`
  ${({ theme }) => css`
    border-radius: ${theme.radius.sm};
    background: ${theme.colors.lightGray};
    padding: 3.25rem 3rem;

    @media (width < ${theme.mediaQueries.tablet}) {
      padding: 2.5rem 2rem;
    }
  `}
`

const StyledListHeading = styled(Typo.Heading2)`
  ${({ theme }) => css`
    && {
      font-size: ${theme.fonts.sizes['2xl']};
      margin-bottom: 1.5rem;
    }
  `}
`

const StyledList = styled.ul`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    @media (width < ${theme.mediaQueries.mobile}) {
      gap: 2.5rem;
    }
  `}
`

const StyledListItem = styled.li<{ $isLink: boolean }>`
  ${({ theme, $isLink }) => css`
    position: relative;
    display: grid;
    align-items: center;
    grid-template-columns: 2.25rem 1fr;
    grid-template-rows: auto auto;
    grid-template-areas:
      'emoji title'
      'emoji description';
    gap: 0 2.75rem;

    ${$isLink &&
    css`
      &:hover a {
        text-decoration: underline;
      }
    `}

    @media (width < ${theme.mediaQueries.mobile}) {
      grid-template-columns: 1fr;
      grid-template-areas:
        'emoji'
        'title'
        'description';
    }
  `}
`

const StyledEmoji = styled(OutlinedText)`
  ${({ theme }) => css`
    grid-area: emoji;
    font-size: ${theme.fonts.sizes['5xl']};
    justify-self: center;
    transform: rotate(-10deg);

    @media (width < ${theme.mediaQueries.mobile}) {
      justify-self: start;
      margin-bottom: 1rem;
    }
  `}
`

const StyledTitle = styled.p`
  ${({ theme }) => css`
    grid-area: title;
    font-weight: ${theme.fonts.weights.bold};
  `}
`

const StyledDescription = styled.p`
  ${({ theme }) => css`
    grid-area: description;
    font-weight: ${theme.fonts.weights.medium};
  `}
`

// The link covers the whole item so that it is entirely clickable
const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
  }
`
