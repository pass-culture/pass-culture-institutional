import React from 'react'
import styled from 'styled-components'

import { APIResponseData } from '@/types/strapi'

interface ImageGalleryProps {
  images: { data: APIResponseData<'plugin::upload.file'>[] }
}

export function ImageGallery(props: ImageGalleryProps) {
  const images = props.images.data

  const firstRowImages: APIResponseData<'plugin::upload.file'>[] = []
  const secondRowImages: APIResponseData<'plugin::upload.file'>[] = []

  // Split images based on their size. Some images may be wider than other and take more place in a row.
  // So images are split in half based on their width
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
      // 0.1 is to take the gap between the images in the rendered row into account
      currentRatio += ratio + 0.1
    }
  }

  return (
    <Root>
      <Row>
        {firstRowImages.map((image) => (
          <img
            key={image.id}
            src={image.attributes.url}
            alt=""
            width={image.attributes.width}
            height={image.attributes.height}
          />
        ))}
      </Row>
      <Row>
        {secondRowImages.map((image) => (
          <img
            key={image.id}
            src={image.attributes.url}
            alt=""
            width={image.attributes.width}
            height={image.attributes.height}
          />
        ))}
      </Row>
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
