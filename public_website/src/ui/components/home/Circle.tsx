import React from 'react'
import styled, { css } from 'styled-components'

type CircleProps = {
  index: number
  width: string
  children: React.ReactNode
  images: {
    url: string
    rotation: string
    left?: string
    right?: string
    top?: string
    bottom?: string
  }[]
}

const Circle = (props: CircleProps) => {
  const { index, width, images, children } = props
  return (
    <StyledCircle $index={index} $width={width} aria-hidden="true">
      {children}
      {images?.map((image) => (
        <React.Fragment key={image.url}>
          <StyledImageWrapper
            $rotation={image.rotation}
            $top={image.top}
            $bottom={image.bottom}
            $right={image.right}
            $left={image.left}>
            <StyledImageLayer />
            <StyledImage $imageUrl={image.url} />
          </StyledImageWrapper>
        </React.Fragment>
      ))}
    </StyledCircle>
  )
}

export default Circle

const StyledCircle = styled.div<{ $index: number; $width: string }>`
  ${({ theme, $index, $width }) => css`
    background-image: url('/images/home-circle-${$index}.svg');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    border-radius: 50%;
    width: ${$width};
    aspect-ratio: 1 / 1;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    user-select: none;
    z-index: -1;

    span {
      font-size: ${theme.fonts.sizes['7xl']};
    }

    @media (width < ${theme.mediaQueries.mobile}) {
      display: none;
    }
  `}
`

const StyledImageWrapper = styled.div<{
  $rotation: string
  $top?: string
  $bottom?: string
  $right?: string
  $left?: string
}>`
  ${({ theme, $rotation, $top, $bottom, $left, $right }) => css`
    height: 6.25rem;
    width: 4rem;
    position: absolute;
    top: ${$top};
    bottom: ${$bottom};
    left: ${$left};
    right: ${$right};
    transform: rotate(${$rotation});

    @media (width < ${theme.mediaQueries.mobile}) {
      display: none;
    }
  `}
`

const StyledImage = styled.div<{
  $imageUrl: string
}>`
  ${({ $imageUrl }) => css`
    background-image: ${$imageUrl ? `url(${$imageUrl})` : 'none'};
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: 1rem;
    position: absolute;
    inset: 0;
  `}
`

const StyledImageLayer = styled.div`
  ${({ theme }) => css`
    position: absolute;
    inset: 0;
    border-radius: 1rem;
    background: ${theme.colors.purple};
    transform: rotate(6deg);
    filter: drop-shadow(-4px 8px 14px rgba(0, 0, 0, 0.4));
  `}
`
