import React, { useState } from 'react'
import Image from 'next/image'
import { Slide } from 'pure-react-carousel'
import styled, { css } from 'styled-components'

import { CARD_BACKGROUNDS, ItemsTheme } from '@/theme/style'
import { PiledCardsCarouselSlideProps } from '@/types/props'
import { Typo } from '@/ui/components/typographies'
import { getStrapiURL } from '@/utils/apiHelpers'

export function VerticalCarouselSlide(props: PiledCardsCarouselSlideProps) {
  const { slideIndex, image, title, description, theme } = props
  const imageUrl =
    typeof image === 'string' ? image : image?.data?.attributes?.url

  const [descriptionIsOpen, setDescriptionIsOpen] = useState<boolean>(false)
  const URL = getStrapiURL(imageUrl)

  return (
    <Root
      index={slideIndex}
      key={title}
      innerClassName="inner"
      role="group"
      aria-roledescription="diapositive"
      $slideTheme={theme}>
      <div>
        {imageUrl && <StyledImage src={URL} alt="" width={270} height={330} />}
        <StyledTitle>{title}</StyledTitle>

        {descriptionIsOpen ? (
          <StyledDescription>{description}</StyledDescription>
        ) : (
          <ShowMoreButton
            as="button"
            onClick={(): void => setDescriptionIsOpen(true)}>
            Voir plus
          </ShowMoreButton>
        )}
      </div>
    </Root>
  )
}

const Root = styled(Slide)<{ $slideTheme: ItemsTheme }>`
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
