import React, { useState } from 'react'
import Image from 'next/image'
import { Slide } from 'pure-react-carousel'
import styled, { css } from 'styled-components'

import { Typo } from '../../../ui/components/typographies'
import { PiledCardItemsTheme } from './piled-card-items-theme'
import { theme } from '@/theme/theme'
import { APIResponse } from '@/types/strapi'
import { getStrapiURL } from '@/utils/apiHelpers'

export type PiledCardsCarouselSlideProps = {
  slideIndex: number
  image: string | APIResponse<'plugin::upload.file'> | null
  title: string
  description: string
  theme: PiledCardItemsTheme
}

export function VerticalCarouselSlide({
  slideIndex,
  image,
  title,
  description,
  theme,
}: PiledCardsCarouselSlideProps) {
  const imageUrl =
    typeof image === 'string' ? image : image?.data.attributes.url

  const [descriptionIsOpen, setDescriptionIsOpen] = useState(false)

  return (
    <Root
      index={slideIndex}
      key={title}
      innerClassName="inner"
      role="group"
      aria-roledescription="diapositive"
      $slideTheme={theme}>
      <div>
        {imageUrl && (
          <StyledImage
            src={getStrapiURL(imageUrl)}
            alt=""
            width={270}
            height={330}
          />
        )}
        <StyledTitle>{title}</StyledTitle>

        {descriptionIsOpen ? (
          <StyledDescription>{description}</StyledDescription>
        ) : (
          <ShowMoreButton
            as="button"
            onClick={() => setDescriptionIsOpen(true)}>
            Voir plus
          </ShowMoreButton>
        )}
      </div>
    </Root>
  )
}

const CARD_BACKGROUNDS: Record<PiledCardItemsTheme, string> = {
  purple: theme.uniqueColors.purple,
  yellow: `linear-gradient(141.28deg, ${theme.uniqueColors.yellowLight} 1.24%, ${theme.uniqueColors.yellowDark} 97.04%)`,
  magenta: `linear-gradient(140.89deg, ${theme.uniqueColors.magentaLight} 1.32%, ${theme.uniqueColors.magenta} 99.76%)`,
  orange: `linear-gradient(139.76deg, ${theme.uniqueColors.orangeLight} -0.2%, ${theme.uniqueColors.orangeDark} 98.71%)`,
  green: theme.uniqueColors.green,
}

const Root = styled(Slide)<{ $slideTheme: PiledCardItemsTheme }>`
  ${({ $slideTheme }) => css`
    .inner {
      margin-right: 1rem;

      background: ${CARD_BACKGROUNDS[$slideTheme]};
      padding: 2rem;
      border-radius: 1.25rem;
    }
  `}
`

const StyledImage = styled(Image)`
  border-radius: 0.5rem;
  object-fit: cover;
`

const StyledTitle = styled(Typo.Heading3)`
  margin: 1.5rem 0 0.25rem;
  color: ${({ theme }) => theme.colors.white};
`

const StyledDescription = styled(Typo.Body)`
  color: ${({ theme }) => theme.colors.white};
`

const ShowMoreButton = styled(Typo.Body)`
  text-decoration: underline;
  color: ${({ theme }) => theme.colors.white};
`
