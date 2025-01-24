import React from 'react'
import { Slide } from 'pure-react-carousel'
import styled, { css } from 'styled-components'

import { UploadFileFragment } from '@/generated/graphql'
import { getStrapiURL } from '@/utils/apiHelpers'

type LogoCarouselSlideProps = {
  slideIndex: number
  image: UploadFileFragment
}

export function LogoCarouselSlide(props: LogoCarouselSlideProps) {
  const { slideIndex, image } = props
  return (
    <Root
      index={slideIndex}
      key={image?.alternativeText}
      innerClassName="inner"
      aria-roledescription="diapositive">
      <StyledLink>
        <StyledImageSimple
          alt={image?.alternativeText ?? ''}
          src={getStrapiURL(image?.url)}></StyledImageSimple>
      </StyledLink>
    </Root>
  )
}

const Root = styled(Slide)`
  .inner {
    margin-right: 1rem;
    margin-left: 1rem;
  }
`
const StyledLink = styled.div`
  ${({ theme }) => css`
    display: block;
    background-color: ${theme.colors.lightBlue};
    border-radius: 0.3rem;
    padding: 0.5rem 1.4rem 0.3rem;
    height: 100%;
  `}
`
const StyledImageSimple = styled.img`
  object-fit: contain;
  width: 100%;
  height: 100%;
  height: 6rem;
`
