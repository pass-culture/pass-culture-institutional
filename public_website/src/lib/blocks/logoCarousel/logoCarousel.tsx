import React, { useEffect, useMemo } from 'react'
import { CarouselProvider, Slider } from 'pure-react-carousel'
import styled, { css } from 'styled-components'

import { LogoCarouselSlide } from './logoCarouselSlide'
import { useWindowSize } from '@/hooks/useWindowSize'
import BlockRendererWithCondition from '@/lib/BlockRendererWithCondition'
import { MediaQueries } from '@/theme/media-queries'
import { LogoCarouselProps } from '@/types/props'
import NavigationWithArrow from '@/ui/components/nav-carousel/NavigationWithArrow'
import NavigationWithDots from '@/ui/components/nav-carousel/NavigationWithDots'
import { cleanSlideAttributes } from '@/utils/carouselHelper'
import { getMediaQuery } from '@/utils/getMediaQuery'
import { stripTags } from '@/utils/stripTags'

const MOBILE_WIDTH = getMediaQuery(MediaQueries.MOBILE)
const LARGE_DESKTOP_WIDTH = getMediaQuery(MediaQueries.LARGE_DESKTOP)

export function LogoCarousel(props: LogoCarouselProps) {
  const { items } = props
  const LOGO_CAROUSEL_SELECTOR = `[aria-roledescription="carrousel"][aria-label="${stripTags(
    'title'
  )}"]`
  const SLIDES_SELECTOR = '[aria-roledescription="diapositive"]'
  const { width = 0 } = useWindowSize({ debounceDelay: 50 })
  const TOTAL_SLIDES = useMemo(() => items.length, [items])

  const getvisibleSlides = useMemo(() => {
    if (width < MOBILE_WIDTH) return 2
    if (width < LARGE_DESKTOP_WIDTH) return 3
    return 6
  }, [width])

  const isNavShowing = useMemo(() => {
    const visibleKeySlides = getvisibleSlides
    return TOTAL_SLIDES > visibleKeySlides
  }, [TOTAL_SLIDES, getvisibleSlides])

  useEffect(() => {
    const carouselEl = document.querySelector(LOGO_CAROUSEL_SELECTOR)
    const carouselSlidesEl = carouselEl?.querySelectorAll(SLIDES_SELECTOR)

    if (carouselEl && carouselSlidesEl) {
      cleanSlideAttributes(carouselEl, carouselSlidesEl)
    }
  }, [LOGO_CAROUSEL_SELECTOR])

  const visibleSlides = getvisibleSlides

  return (
    <CarouselProvider
      naturalSlideWidth={60}
      naturalSlideHeight={75}
      totalSlides={TOTAL_SLIDES}
      visibleSlides={visibleSlides}
      isIntrinsicHeight
      infinite={false}
      dragEnabled={false}
      step={1}>
      <StyledSlider
        classNameAnimation="customCarrouselAnimation"
        aria-label={stripTags('title')}
        aria-roledescription="carrousel">
        {items?.map((item, index) => {
          return (
            !!item.logo && (
              <LogoCarouselSlide
                key={`${item.logo.data.attributes.hash}_${index}`}
                slideIndex={index}
                {...item}
                image={item.logo}
              />
            )
          )
        })}
      </StyledSlider>
      <BlockRendererWithCondition condition={isNavShowing}>
        <StyledHeading>
          <BlockRendererWithCondition condition={width > MOBILE_WIDTH}>
            <NavigationWithArrow
              carrouselSelector={LOGO_CAROUSEL_SELECTOR}
              slidesSelector={SLIDES_SELECTOR}
            />
          </BlockRendererWithCondition>
        </StyledHeading>
        <BlockRendererWithCondition
          condition={isNavShowing && width < MOBILE_WIDTH}>
          <NavigationWithDots
            items={items}
            carrouselSelector={LOGO_CAROUSEL_SELECTOR}
            slidesSelector={SLIDES_SELECTOR}
            carouselName="LOGO_CAROUSEL"
          />
        </BlockRendererWithCondition>
      </BlockRendererWithCondition>
    </CarouselProvider>
  )
}

const StyledHeading = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: end;
    justify-content: center;
    @media (width < ${theme.mediaQueries.largeDesktop}) {
      padding-right: 0;
      margin-top: 2.5rem;
    }
  `}
`
const StyledSlider = styled(Slider)`
  overflow: hidden;
  .carousel__slider-tray {
    margin: auto;
  }
`
