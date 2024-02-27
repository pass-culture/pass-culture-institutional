import React, { useEffect, useState } from 'react'
import {
  ButtonBack,
  ButtonNext,
  CarouselProvider,
  Dot,
  Slider,
} from 'pure-react-carousel'
import styled, { css } from 'styled-components'

import { ArrowRight } from '../icons/ArrowRight'
import { Typo } from '../typographies'
import {
  VerticalCarouselSlide,
  VerticalCarouselSlideProps,
} from './VerticalCarouselSlide'
import { theme } from '@/theme/theme'

export type VerticalCarouselProps = {
  title: string
  items: Omit<VerticalCarouselSlideProps, 'slideIndex'>[]
}

export function VerticalCarousel({ title, items }: VerticalCarouselProps) {
  const [screenWidth, setScreenWidth] = useState<number>()

  // Computed the number of visible slides depending on screen width
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Get the MQ in rem and convert it in pixels
  const visibleSlides =
    screenWidth &&
    screenWidth < Number(theme.mediaQueries.mobile.split('rem')[0]) * 16
      ? 1
      : 4

  return (
    <CarouselProvider
      naturalSlideWidth={60}
      naturalSlideHeight={75}
      totalSlides={items.length}
      visibleSlides={visibleSlides}
      isIntrinsicHeight={true}
      infinite={true}
      dragEnabled={false}
      step={1}>
      <StyledHeading>
        <Typo.Heading2 dangerouslySetInnerHTML={{ __html: title }} />

        <StyledNavigationButtons role="group" aria-label="Contrôles du slider">
          <ButtonBack aria-label="Slide précédente">
            <ArrowRight />
          </ButtonBack>
          <ButtonNext aria-label="Slide suivante">
            <ArrowRight />
          </ButtonNext>
        </StyledNavigationButtons>
      </StyledHeading>

      {/*
       * TODO: remove attributes on slider:
       * - tabindex
       * - aria-live
       */}
      <StyledSlider
        role="region"
        aria-label={title}
        aria-roledescription="carrousel"
        aria-live="off"
        tabIndex={-1}>
        {items.map((item, index) => {
          return (
            <VerticalCarouselSlide
              key={item.title}
              slideIndex={index}
              {...item}
            />
          )
        })}
      </StyledSlider>

      <StyledDots role="group" aria-label="Contrôles du slider">
        {items.map((item, index) => {
          return (
            <StyledDot
              key={item.title}
              slide={index}
              aria-label={`Afficher la slide ${index + 1} sur ${
                items.length
              } : ${item.title}`}
            />
          )
        })}
      </StyledDots>
    </CarouselProvider>
  )
}

const StyledHeading = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: end;
    justify-content: space-between;
    padding-right: 7rem;
    margin-bottom: 3rem;

    @media (width < ${theme.mediaQueries.mobile}) {
      margin-bottom: 2.5rem;
    }
  `}
`

const StyledSlider = styled(Slider)`
  overflow: hidden;
`

const StyledNavigationButtons = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 0.375rem;

    @media (width < ${theme.mediaQueries.mobile}) {
      display: none;
    }

    button {
      background-color: ${theme.colors.white};
      box-shadow: ${theme.shadows.popover};
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 3.625rem;
      width: 3.625rem;
    }

    button:first-child {
      transform: rotate(180deg);
    }
  `}
`

const StyledDots = styled.div`
  ${({ theme }) => css`
    display: none;

    @media (width < ${theme.mediaQueries.mobile}) {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      margin-top: 2rem;
    }
  `}
`

const StyledDot = styled(Dot)`
  ${({ theme }) => css`
    width: 0.875rem;
    height: 0.875rem;
    border-radius: 50%;
    opacity: 0.22;
    background-color: ${theme.colors.black};

    &[disabled] {
      background-color: ${theme.colors.secondary};
      opacity: 1;
    }
  `}
`
