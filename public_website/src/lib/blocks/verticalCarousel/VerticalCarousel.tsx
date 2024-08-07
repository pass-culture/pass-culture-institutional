import React, { useEffect, useMemo } from 'react'
import { CarouselProvider, Slider } from 'pure-react-carousel'
import styled, { css } from 'styled-components'

import NavigationWithArrow from '../../../ui/components/nav-carousel/NavigationWithArrow'
import NavigationWithDots from '../../../ui/components/nav-carousel/NavigationWithDots'
import { VerticalCarouselSlide } from './VerticalCarouselSlide'
import { useWindowSize } from '@/hooks/useWindowSize'
import BlockRendererWithCondition from '@/lib/BlockRendererWithCondition'
import { MediaQueries } from '@/theme/media-queries'
import { VerticalCarouselProps } from '@/types/props'
import { ContentWrapper } from '@/ui/components/ContentWrapper'
import { Typo } from '@/ui/components/typographies'
import { cleanSlideAttributes } from '@/utils/carouselHelper'
import { getMediaQuery } from '@/utils/getMediaQuery'
import { stripTags } from '@/utils/stripTags'

const MOBILE_WIDTH = getMediaQuery(MediaQueries.MOBILE)
const LARGE_DESKTOP_WIDTH = getMediaQuery(MediaQueries.LARGE_DESKTOP)

export function VerticalCarousel(
  props: VerticalCarouselProps & { children?: React.ReactNode }
) {
  const { title, items, hidePlayIcon, children } = props

  const itemsFilter = items.filter((item) => {
    return item.image && item.image !== ''
  })
  const TOTAL_SLIDES = useMemo(() => itemsFilter.length, [itemsFilter])

  const CAROUSEL_SELECTOR = `[aria-roledescription="carrousel"][aria-label="${stripTags(
    title
  )}"]`
  const SLIDES_SELECTOR = '[aria-roledescription="diapositive"]'
  const { width = 0 } = useWindowSize({ debounceDelay: 50 })

  const getvisibleSlides = useMemo(() => {
    if (width < MOBILE_WIDTH) return 2
    if (width < LARGE_DESKTOP_WIDTH) return 3
    return 4
  }, [width])

  const isNavShowing = useMemo(() => {
    const visibleKeySlides = getvisibleSlides
    return TOTAL_SLIDES > visibleKeySlides
  }, [TOTAL_SLIDES, getvisibleSlides])

  const visibleSlides = getvisibleSlides

  useEffect(() => {
    const carouselEl = document.querySelector(CAROUSEL_SELECTOR)
    const carouselSlidesEl = carouselEl?.querySelectorAll(SLIDES_SELECTOR)

    if (carouselEl && carouselSlidesEl) {
      cleanSlideAttributes(carouselEl, carouselSlidesEl)
    }
  }, [CAROUSEL_SELECTOR])

  return (
    <StyledBackgroundExperienceVideoCarousel>
      <StyledContainer>
        <CarouselProvider
          naturalSlideWidth={60}
          naturalSlideHeight={75}
          totalSlides={TOTAL_SLIDES}
          visibleSlides={visibleSlides}
          isIntrinsicHeight
          infinite={false}
          dragEnabled
          touchEnabled
          step={1}>
          <BlockRendererWithCondition condition={isNavShowing}>
            <StyledHeading>
              <Typo.Heading2>{title}</Typo.Heading2>
              <BlockRendererWithCondition condition={width > MOBILE_WIDTH}>
                <NavigationWithArrow
                  carrouselSelector={CAROUSEL_SELECTOR}
                  slidesSelector={SLIDES_SELECTOR}
                />
              </BlockRendererWithCondition>
            </StyledHeading>
          </BlockRendererWithCondition>

          <Slider
            classNameAnimation="customCarrouselAnimation"
            role="region"
            aria-label={stripTags(title)}
            aria-roledescription="carrousel">
            {items?.map((item, index) => {
              return (
                <VerticalCarouselSlide
                  key={`${item.title}_${index}`}
                  slideIndex={index}
                  {...item}
                  hidePlayIcon={hidePlayIcon}
                />
              )
            })}
          </Slider>
          <BlockRendererWithCondition
            condition={isNavShowing && width < MOBILE_WIDTH}>
            <NavigationWithDots
              items={items}
              carrouselSelector={CAROUSEL_SELECTOR}
              slidesSelector={SLIDES_SELECTOR}
              carouselName="VERTICAL_CAROUSEL"
            />
          </BlockRendererWithCondition>
        </CarouselProvider>
        {!!children && children}
      </StyledContainer>
    </StyledBackgroundExperienceVideoCarousel>
  )
}
const StyledBackgroundExperienceVideoCarousel = styled.div`
  ${({ theme }) => css`
    width: 100%;
    height: 100%;
    background: ${theme.colors.lila};
    margin-top: var(--module-margin);
    margin-bottom: var(--module-margin);
  `}
`
const StyledContainer = styled(ContentWrapper)`
  ${({ theme }) => css`
    padding-top: var(--module-margin);
  @media (width < ${theme.mediaQueries.mobile}) {
    padding-top:1.875rem;
    padding-bottom:1.875rem;
  }
  }
  `}
`
const StyledHeading = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: end;
    justify-content: space-between;
    margin-bottom: 3rem;

    @media (width < ${theme.mediaQueries.mobile}) {
      margin-bottom: 2.5rem;
      display: block;
      text-align: left;
    }
  `}
`
