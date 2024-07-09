import React from 'react'
import Image from 'next/image'
import { Slide } from 'pure-react-carousel'
import styled, { css } from 'styled-components'

import BlockRendererWithCondition from '@/lib/BlockRendererWithCondition'
import { VerticalCarouselSlideProps } from '@/types/props'
import { Play } from '@/ui/components/icons/Play'
import { Link } from '@/ui/components/Link'
import { Typo } from '@/ui/components/typographies'
import { getStrapiURL } from '@/utils/apiHelpers'
import { isRenderable } from '@/utils/isRenderable'

export function VerticalCarouselSlide(props: VerticalCarouselSlideProps) {
  const { slideIndex, image, title, description, url, hidePlayIcon } = props
  const imageUrl =
    typeof image === 'string' ? image : image?.data?.attributes?.url

  return (
    <Root
      index={slideIndex}
      key={title}
      innerClassName="inner"
      role="group"
      aria-roledescription="diapositive">
      <div>
        <BlockRendererWithCondition condition={isRenderable(imageUrl)}>
          <StyledImageWrapper>
            <Image
              src={getStrapiURL(imageUrl)}
              alt=""
              layout="fill" // TODO: Fix deprecated use of "layout" (https://nextjs.org/docs/messages/next-image-upgrade-to-13)
              objectFit="cover" // TODO: Fix deprecated use of "objectFit": (https://nextjs.org/docs/messages/next-image-upgrade-to-13)
            />
            {!hidePlayIcon && <PlayIcon />}
          </StyledImageWrapper>
        </BlockRendererWithCondition>
        <StyledTitle as={Link} href={url}>
          {title}
        </StyledTitle>
        <Typo.Body>{description}</Typo.Body>
      </div>
    </Root>
  )
}

const Root = styled(Slide)`
  ${({ theme }) => css`
    position: relative;

    &:not(:last-child) {
      margin-right: 2rem;
    }

    @media (width < ${theme.mediaQueries.mobile}) {
      &:not(:last-child) {
        margin-right: 1rem;
      }
      .inner {
        margin: 0;
      }
    }
  `}
`

const StyledTitle = styled(Typo.Heading3)`
  margin: 1.5rem 0 0.25rem;
  width: 90%;
  font-size: ${({ theme }) => theme.fonts.sizes['xl']};
  display: block;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
  }
`

const StyledImageWrapper = styled.div`
  width: 100%;
  border-radius: 0.5rem;
  position: relative;
  aspect-ratio: 283 / 401;
  border-radius: 0.5rem;
  img {
    border-radius: 0.5rem;
  }
`

const PlayIcon = styled(Play)`
  position: absolute;
  bottom: 1.5rem;
  left: 1.5rem;
  width: 3.25rem;
  height: 3.25rem;
`
