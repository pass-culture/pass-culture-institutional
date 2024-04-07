import React, { useMemo } from 'react'
import styled from 'styled-components'

import { APIResponseData } from '@/types/strapi'

type ImageData = APIResponseData<'plugin::upload.file'>

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

export function ImageGallery(props: ImageGalleryProps) {
  const imageRows = useMemo(
    () => splitImages(props.images.data),
    [props.images.data]
  )

  return (
    <Root>
      {imageRows.map((images, i) => (
        <Row key={i}>
          {images.map((image) => (
            <img
              key={image.id}
              src={image.attributes.url}
              alt=""
              width={image.attributes.width}
              height={image.attributes.height}
            />
          ))}
        </Row>
      ))}
    </Root>
  )
}

const Root = styled.div`
  overflow: scroll;
  padding: 1rem;

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

  &:nth-child(2) {
    padding-left: 7.5rem;
  }

  img {
    height: 100%;
    width: auto;
    border-radius: 1.25rem;
  }
`
