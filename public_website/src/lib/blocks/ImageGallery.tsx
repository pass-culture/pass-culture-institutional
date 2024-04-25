import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import styled, { css } from 'styled-components'

import { APIResponseData } from '@/types/strapi'
import { ArrowRight } from '@/ui/components/icons/ArrowRight'

type ImageData = APIResponseData<'plugin::upload.file'>

interface ImageFormats {
  medium?: {
    width: number
    height: number
    url: string
  }
}

interface ImageGalleryProps {
  images: { data: ImageData[] }
}

/**
 * Split images based on their size. Some images may be wider than other and take more place in a row.
 * So images are split in half based on their width
 */
function splitImages(images: ImageData[]): [ImageData[], ImageData[]] {
  const firstRowImages: ImageData[] = []
  const secondRowImages: ImageData[] = []

  {
    const ratios = images.map(
      (image) => image.attributes.width! / image.attributes.height!
    )
    const ratioTotal = ratios.reduce((total, it) => total + it, 0)

    let currentRatio = 0
    for (let i = 0; i < images.length; i++) {
      const img = images[i]!
      const ratio = ratios[i]!
      if (currentRatio <= ratioTotal / 2) {
        firstRowImages.push(img)
      } else {
        secondRowImages.push(img)
      }
      // 0.1 is to take the gap between the images in the rendered row into
      // account (1.5rem horizontal gap over 15rem image height)
      currentRatio += ratio + 0.1
    }
  }

  return [firstRowImages, secondRowImages]
}

const ImageComponent: React.FC<{
  image: ImageData
}> = ({ image }) => (
  <img
    src={
      (image.attributes.formats as ImageFormats)?.medium?.url ||
      image.attributes.url
    }
    alt={image.attributes.alternativeText ?? ''}
    width={image.attributes.width}
    height={image.attributes.height}
    fetchPriority="low"
    loading={'lazy'}
    decoding={'async'}
  />
)

export function ImageGallery(props: ImageGalleryProps) {
  const [firstRow, secondRow] = useMemo(
    () => splitImages(props.images.data),
    [props.images.data]
  )

  const galleryElement = useRef<HTMLDivElement>(null)

  const scrollForward = useCallback(() => {
    galleryElement.current?.scrollBy({ left: 300, behavior: 'smooth' })
  }, [])

  const scrollBackward = useCallback(() => {
    galleryElement.current?.scrollBy({ left: -300, behavior: 'smooth' })
  }, [])

  const rowElement = useRef<HTMLDivElement>(null)
  const [showScrollButtons, setShowScrollButtons] = useState(true)

  // Show scroll buttons only if the image gallery is wider than the screen
  const checkGalleryWidth = () => {
    if (!rowElement.current) return

    const galleryWidth = rowElement.current?.getBoundingClientRect().width
    const screenWidth = window.innerWidth
    setShowScrollButtons(screenWidth < galleryWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', () => {
      checkGalleryWidth()
    })

    checkGalleryWidth()
  }, [])

  return (
    <Root>
      <Rows
        ref={galleryElement}
        aria-label="Galerie d'images"
        $galleryIsShort={!showScrollButtons}>
        <Row ref={rowElement}>
          {firstRow.map((image) => (
            <ImageComponent key={image.id} image={image} />
          ))}
        </Row>
        <Row>
          {secondRow.map((image) => (
            <ImageComponent key={image.id} image={image} />
          ))}
        </Row>
      </Rows>
      {showScrollButtons && (
        <Controls>
          <ControlButton
            $flip
            onClick={scrollBackward}
            aria-label="Défiler la galerie d'image vers la droite">
            <ArrowRight />
          </ControlButton>
          <ControlButton
            onClick={scrollForward}
            aria-label="Défiler la galerie d'image vers la gauche">
            <ArrowRight />
          </ControlButton>
        </Controls>
      )}
    </Root>
  )
}

const Root = styled.div`
  margin-bottom: var(--module-margin);
  margin-top: var(--module-margin);

  @media (width < ${(p) => p.theme.mediaQueries.mobile}) {
    margin: 2.825rem auto;
  }
`

const Rows = styled.div<{ $galleryIsShort: boolean }>`
  overflow: scroll;
  padding: 0 1rem;

  ${({ $galleryIsShort }) =>
    $galleryIsShort &&
    css`
      display: flex;
      flex-direction: column;
      align-items: center;
    `}

  /* Hide scroll bar */
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`

const Row = styled.div`
  height: 15rem;
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  width: fit-content;

  &:nth-child(2) {
    padding-left: 7.5rem;
  }

  img {
    height: 100%;
    width: auto;
    border-radius: 1.25rem;
  }
`

const Controls = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
`

const ControlButton = styled.button<{ $flip?: boolean }>`
  ${({ theme, $flip }) => css`
    width: 3.75rem;
    height: 3.75rem;
    border-radius: 50%;
    box-shadow: ${theme.shadows.popover};
    display: inline-flex;
    justify-content: center;
    align-items: center;

    svg {
      ${$flip && 'transform: rotate(180deg);'}
    }
  `}
`
