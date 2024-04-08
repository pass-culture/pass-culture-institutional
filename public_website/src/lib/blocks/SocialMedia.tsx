import React from 'react'
import styled, { css } from 'styled-components'

import { Facebook } from '@/ui/components/icons/social-media/facebook'
import { Instagram } from '@/ui/components/icons/social-media/instagram'
import { LinkedIn } from '@/ui/components/icons/social-media/linkedin'
import { SnapChat } from '@/ui/components/icons/social-media/snapchat'
import { TikTok } from '@/ui/components/icons/social-media/tiktok'
import { X } from '@/ui/components/icons/social-media/x'
import { YouTube } from '@/ui/components/icons/social-media/youtube'
import { Link } from '@/ui/components/Link'
import { Typo } from '@/ui/components/typographies'

type SocialMediaProps = {
  title: string
  socialMediaLink: { name: string; url: string }[]
  className?: string
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

export function SocialMedia({
  title,
  socialMediaLink,
  className,
}: SocialMediaProps) {
  return (
    <StyledRoot className={className}>
      <StyledHeading>{title}</StyledHeading>
      <StyledList>
        {socialMediaLink.map((link) => {
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

const StyledHeading = styled(Typo.Heading2)`
  ${({ theme }) => css`
    margin-bottom: 2rem;

    @media (width < ${theme.mediaQueries.mobile}) {
      margin-bottom: 1.5rem;
    }
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
      width: 6rem;
      height: 6rem;
      background: ${theme.colors.secondary};
      transform: rotate(4deg);

      svg {
        max-width: 2rem;
        max-height: 2rem;
      }
    }
    transition: all 0.4s ease-in-out;
    &:nth-child(even) a {
      background: ${theme.colors.tertiary};
      transform: rotate(-4deg);
    }

    &:hover {
      transform: rotate(-35deg);
      filter: brightness(0.8);
    }
    &:focus {
      outline: 2px solid ${theme.colors.primary};
    }
    outline-offset: 2px;
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
