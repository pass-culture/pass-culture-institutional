import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Slide } from 'pure-react-carousel'
import styled from 'styled-components'

import { Typo } from '../typographies'

export type VerticalCarouselSlideProps = {
  slideIndex: number
  imageUrl: string
  title: string
  description: string
  url: string
}

export function VerticalCarouselSlide({
  slideIndex,
  imageUrl,
  title,
  description,
  url,
}: VerticalCarouselSlideProps) {
  const [a11yProps, setA11yProps] = useState({})

  useEffect(() => {
    setA11yProps({
      role: undefined,
      ariaSelected: undefined,
    })
  }, [])

  return (
    <Root
      index={slideIndex}
      key={title}
      aria-label={`${title} ${description}`}
      innerClassName="inner"
      aria-selected={undefined}
      role={undefined}
      data-pouet={'pouet'}
      {...a11yProps}>
      <StyledLink href={url}>
        <StyledImage src={imageUrl} alt="" width={300} height={400} />
        <StyledTitle>{title}</StyledTitle>
        <Typo.Body>{description}</Typo.Body>
      </StyledLink>
    </Root>
  )
}

const Root = styled(Slide)`
  .inner {
    margin-right: 1rem;
  }
`

const StyledImage = styled(Image)`
  border-radius: 0.5rem;
  object-fit: cover;
  width: 100%;
  height: auto;
`

const StyledTitle = styled(Typo.Heading3)`
  margin: 1.5rem 0 0.25rem;
`

const StyledLink = styled(Link)`
  display: block;
`
