import React from 'react'
import Link from 'next/link'
import styled, { css } from 'styled-components'

import { Facebook } from '@/ui/components/icons/social-media/facebook'
import { Instagram } from '@/ui/components/icons/social-media/instagram'
import { LinkedIn } from '@/ui/components/icons/social-media/linkedin'
import { SnapChat } from '@/ui/components/icons/social-media/snapchat'
import { TikTok } from '@/ui/components/icons/social-media/tiktok'
import { X } from '@/ui/components/icons/social-media/x'
import { YouTube } from '@/ui/components/icons/social-media/youtube'

type SocialMediaProps = {
  title: string
  links: { name: string; url: string }[]
}

const SOCIAL_ICONS: { [key: string]: React.JSX.Element } = {
  x: <X />,
  instagram: <Instagram />,
  tiktok: <TikTok />,
  youtube: <YouTube />,
  facebook: <Facebook />,
  snapchat: <SnapChat />,
  linkedin: <LinkedIn />,
}

export function SocialMedia({ title, links }: SocialMediaProps) {
  return (
    <StyledRoot>
      <StyledHeading>{title}</StyledHeading>
      <StyledList>
        {links.map((link) => {
          return (
            <StyledListItem key={link.name}>
              <Link href={link.url}>{SOCIAL_ICONS[link.name]}</Link>
            </StyledListItem>
          )
        })}
      </StyledList>
    </StyledRoot>
  )
}

const StyledRoot = styled.div`
  padding: 1rem;
  text-align: center;
`

const StyledHeading = styled.h2`
  ${({ theme }) => css`
    color: ${theme.colors.secondary};
    font-size: ${theme.fonts.sizes['6xl']};
    font-weight: ${theme.fonts.weights.bold};
    margin-bottom: 2rem;
  `}
`

const StyledList = styled.ul`
  ${({ theme }) => css`
    display: flex;
    gap: 1.5rem;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;

    @media (width < ${theme.mediaQueries.mobile}) {
      gap: 1rem;
    }
  `}
`

const StyledListItem = styled.li`
  ${({ theme }) => css`
    a {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      width: 6.25rem;
      height: 6.25rem;
      background: ${theme.colors.secondary};
      transform: rotate(4deg);

      svg {
        max-width: 2rem;
        max-height: 2rem;
      }
    }

    &:nth-child(even) a {
      background: #ec3478;
      transform: rotate(-4deg);
    }

    @media (width < ${theme.mediaQueries.mobile}) {
      a {
        height: 3.25rem;
        width: 3.25rem;

        svg {
          max-width: 1.25rem;
          max-height: 1.25rem;
        }
      }
    }
  `}
`