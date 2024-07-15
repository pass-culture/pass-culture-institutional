import React, { useEffect, useMemo } from 'react'
import { CarouselProvider, Slider } from 'pure-react-carousel'
import styled, { css } from 'styled-components'

import { KeyNumberCarouselSlide } from './keyNumberCarouselSlide'
import { useWindowSize } from '@/hooks/useWindowSize'
import BlockRendererWithCondition from '@/lib/BlockRendererWithCondition'
import { MediaQueries } from '@/theme/media-queries'
import { KeyNumberCarouselProps } from '@/types/props'
import NavigationWithArrow from '@/ui/components/nav-carousel/NavigationWithArrow'
import NavigationWithDots from '@/ui/components/nav-carousel/NavigationWithDots'
import { Typo } from '@/ui/components/typographies'
import { cleanSlideAttributes } from '@/utils/carouselHelper'
import { getMediaQuery } from '@/utils/getMediaQuery'
import { stripTags } from '@/utils/stripTags'

const MOBILE_WIDTH = getMediaQuery(MediaQueries.MOBILE)
const LARGE_DESKTOP_WIDTH = getMediaQuery(MediaQueries.LARGE_DESKTOP)

export function KeyNumberCarousel(props: KeyNumberCarouselProps) {
  const { title, items } = props
  const KEY_NUMBER_CAROUSEL_SELECTOR = `[aria-roledescription="carrousel"][aria-label="${stripTags(
    title
  )}"]`
  const KEY_NUMBER_SLIDES_SELECTOR = '[aria-roledescription="diapositive"]'
  const { width = 0 } = useWindowSize({ debounceDelay: 50 })
  const TOTAL_SLIDES = useMemo(() => items.length, [items])

  const getvisibleSlides = useMemo(() => {
    if (width < MOBILE_WIDTH) return 2
    if (width < LARGE_DESKTOP_WIDTH) return 1.5
    return 2.2
  }, [width])

  const isNavShowing = useMemo(() => {
    const visibleKeySlides = getvisibleSlides
    return TOTAL_SLIDES > visibleKeySlides
  }, [TOTAL_SLIDES, getvisibleSlides])

  const visibleSlides = getvisibleSlides

  useEffect(() => {
    const carouselEl = document.querySelector(KEY_NUMBER_CAROUSEL_SELECTOR)
    const carouselSlidesEl = carouselEl?.querySelectorAll(
      KEY_NUMBER_SLIDES_SELECTOR
    )

    if (carouselEl && carouselSlidesEl) {
      cleanSlideAttributes(carouselEl, carouselSlidesEl)
    }
  }, [KEY_NUMBER_CAROUSEL_SELECTOR])

  return (
    <StyledCarouselProvider
      naturalSlideHeight={75}
      naturalSlideWidth={60}
      totalSlides={TOTAL_SLIDES}
      visibleSlides={visibleSlides}
      isIntrinsicHeight
      dragEnabled
      infinite={false}
      step={1}>
      <StyledKeyCarouselHeading>
        <StyledTitle>{title}</StyledTitle>

        <BlockRendererWithCondition
          condition={isNavShowing && width > MOBILE_WIDTH}>
          <NavigationWithArrow
            carrouselSelector={KEY_NUMBER_CAROUSEL_SELECTOR}
            slidesSelector={KEY_NUMBER_SLIDES_SELECTOR}
          />
        </BlockRendererWithCondition>
      </StyledKeyCarouselHeading>

      <StyledSlider
        classNameAnimation="customCarrouselAnimation"
        aria-label={stripTags(title)}
        aria-roledescription="carousel">
        {items?.map((item, index) => {
          return (
            <KeyNumberCarouselSlide
              key={`${item.title}_${index}`}
              title={item.title}
              slideIndex={index}
              description={item.description}
              secondEmoji={item.secondEmoji}
              firstEmoji={item.firstEmoji}
              thirdEmoji={item.thirdEmoji}
            />
          )
        })}
      </StyledSlider>

      <BlockRendererWithCondition
        condition={isNavShowing && width < MOBILE_WIDTH}>
        <NavigationWithDots
          items={items}
          carrouselSelector={KEY_NUMBER_CAROUSEL_SELECTOR}
          slidesSelector={KEY_NUMBER_SLIDES_SELECTOR}
        />
      </BlockRendererWithCondition>
    </StyledCarouselProvider>
  )
}

const StyledCarouselProvider = styled(CarouselProvider)`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    background-color: ${theme.colors.lightBlue};

    padding: 3.5rem 0;
    margin: auto;
    margin-bottom: var(--module-margin);
    margin-top: var(--module-margin);

    @media (max-width: ${theme.mediaQueries.mobile}) {
      padding: 0;
      flex-direction: column;
      margin: 0 auto;
      padding-bottom: 2.8rem;
    }
  `}
`
const StyledKeyCarouselHeading = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding-right: 7rem;
    padding-left: 5rem;
    margin-bottom: 3rem;
    width: 30%;

    @media (width < ${theme.mediaQueries.mobile}) {
      width: 100%;
      margin-bottom: 2.5rem;
      margin-top: 2.5rem;
      padding: 0 1rem;
      box-sizing: border-box;
    }
  `}
`
const StyledTitle = styled(Typo.Heading2)`
  margin: 1.5rem 0 0.25rem;

  @media (width < ${(p) => p.theme.mediaQueries.mobile}) {
    margin: 0;
  }
`
const StyledSlider = styled(Slider)`
  ${({ theme }) => css`
    overflow: hidden;
    width: 70%;
    @media (width < ${theme.mediaQueries.mobile}) {
      width: 100%;
    }
  `}
`
