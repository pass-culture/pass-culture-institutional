import React, { useEffect } from 'react'
import { CarouselProvider, Slider } from 'pure-react-carousel'
import styled, { css } from 'styled-components'

import NavigationWithArrow from './NavigationWithArrow'
import NavigationWithDots from './NavigationWithDots'
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

export function VerticalCarousel(props: VerticalCarouselProps) {
  const { title, items, hidePlayIcon } = props
  const itemsFilter = items.filter((item) => {
    return item.image && item.image !== ''
  })

  const CAROUSEL_SELECTOR = `[aria-roledescription="carrousel"][aria-label="${stripTags(
    title
  )}"]`
  const SLIDES_SELECTOR = '[aria-roledescription="diapositive"]'
  const { width = 0 } = useWindowSize({ debounceDelay: 50 })

  const setVisibleSlide = (): number => {
    if (width < MOBILE_WIDTH) return 2
    if (width < LARGE_DESKTOP_WIDTH) return 3
    return 4
  }

  const visibleSlides = setVisibleSlide()
  const isNavigation = (): boolean => {
    return itemsFilter.length > 0
  }
  const TOTAL_SLIDE = itemsFilter.length
  /**
   * Remove unnecessary HTML attributes for a11y.
   * PR #469 will improve that: https://github.com/express-labs/pure-react-carousel/pull/469
   *
   * "pure-react-carousel" does not permit using `ref` on components to allow changing attributes
   */
  useEffect(() => {
    const carouselEl = document.querySelector(CAROUSEL_SELECTOR)
    const carouselSlidesEl = carouselEl?.querySelectorAll(SLIDES_SELECTOR)

    if (carouselEl && carouselSlidesEl) {
      cleanSlideAttributes(carouselEl, carouselSlidesEl)
    }
  }, [CAROUSEL_SELECTOR])

  return (
    <Root>
      <ContentWrapper>
        <CarouselProvider
          naturalSlideWidth={60}
          naturalSlideHeight={75}
          totalSlides={TOTAL_SLIDE}
          visibleSlides={visibleSlides}
          isIntrinsicHeight
          infinite={false}
          dragEnabled
          step={1}>
          <BlockRendererWithCondition condition={isNavigation()}>
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

          <StyledSlider
            classNameAnimation="customCarrouselAnimation"
            role="region"
            aria-label={stripTags(title)}
            aria-roledescription="carrousel">
            {items?.map((item, index) => {
              return (
                <VerticalCarouselSlide
                  key={item.title}
                  slideIndex={index}
                  {...item}
                  hidePlayIcon={hidePlayIcon}
                />
              )
            })}
          </StyledSlider>
          <BlockRendererWithCondition
            condition={isNavigation() && width < MOBILE_WIDTH}>
            <NavigationWithDots
              items={items}
              carrouselSelector={CAROUSEL_SELECTOR}
              slidesSelector={SLIDES_SELECTOR}
            />
          </BlockRendererWithCondition>
        </CarouselProvider>
      </ContentWrapper>
    </Root>
  )
}

const Root = styled.div`
  overflow: hidden;

  /* Fix control button shadows being clipped */
  padding-top: 1rem;
  margin-top: -1rem;
`
const StyledSlider = styled(Slider)``

const StyledHeading = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: end;
    justify-content: space-between;
    margin-bottom: 3rem;

    @media (width < ${theme.mediaQueries.mobile}) {
      margin-bottom: 2.5rem;
      display: block;
      text-align: center;
    }
  `}
`
