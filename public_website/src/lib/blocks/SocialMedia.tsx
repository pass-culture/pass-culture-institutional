import React from 'react'
import styled, { css } from 'styled-components'

import { SocialMediaProps } from '@/types/props'
import { ContentWrapper } from '@/ui/components/ContentWrapper'
import { Facebook } from '@/ui/components/icons/social-media/facebook'
import { Instagram } from '@/ui/components/icons/social-media/instagram'
import { LinkedIn } from '@/ui/components/icons/social-media/linkedin'
import { SnapChat } from '@/ui/components/icons/social-media/snapchat'
import { TikTok } from '@/ui/components/icons/social-media/tiktok'
import { X } from '@/ui/components/icons/social-media/x'
import { YouTube } from '@/ui/components/icons/social-media/youtube'
import { Link } from '@/ui/components/Link'
import { Typo } from '@/ui/components/typographies'

const SOCIAL_ICONS: { [key: string]: React.JSX.Element } = {
  x: <X />,
  instagram: <Instagram />,
  tiktok: <TikTok />,
  youtube: <YouTube />,
  facebook: <Facebook />,
  snapchat: <SnapChat />,
  linkedin: <LinkedIn />,
}

export function SocialMedia(props: SocialMediaProps) {
  const { socialMediaLink = [], title, className } = props

  const sliceIndex = Math.ceil(socialMediaLink.length / 2)
  const firstRow = socialMediaLink.slice(0, sliceIndex)
  const secondRow = socialMediaLink.slice(sliceIndex)

  const renderFirstRow = (
    collection: {
      name: string
      url: string
    }[]
  ) => {
    return (
      <StyledList>
        {collection?.map((link) => {
          return (
            <StyledListItem key={link.name}>
              <Link href={link.url}>{SOCIAL_ICONS[link.name]}</Link>
            </StyledListItem>
          )
        })}
      </StyledList>
    )
  }

  return (
    <ContentWrapper className={className}>
      {title && <StyledHeading>{title}</StyledHeading>}
      <Lists>
        {renderFirstRow(firstRow)}
        {renderFirstRow(secondRow)}
      </Lists>
    </ContentWrapper>
  )
}

const StyledHeading = styled(Typo.Heading2)`
  ${({ theme }) => css`
    margin-bottom: 2rem;
    text-align: center;

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

      outline-offset: 2px;

      &:active {
        outline: 2px solid ${theme.colors.secondary};
      }

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
    // &:focus {
    //   outline: 2px solid ${theme.colors.secondary};
    // }

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

const Lists = styled.div`
  display: flex;
  flex-wrap: wrap;

  gap: 1.5rem;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  @media (width < ${(p) => p.theme.mediaQueries.mobile}) {
    gap: 1rem;
  }
`
