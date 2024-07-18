import React, { useEffect, useMemo, useState } from 'react'
import { CarouselProvider, Slider } from 'pure-react-carousel'
import styled, { css } from 'styled-components'

import NavigationWithArrow from '../../../ui/components/nav-carousel/NavigationWithArrow'
import NavigationWithDots from '../../../ui/components/nav-carousel/NavigationWithDots'
import { VerticalCarouselSlide } from './VerticalCarouselSlide'
import useLockBodyScroll from '@/hooks/useLockBodyScroll'
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

  const [isScroll, setIsSctoll] = useState<boolean>(false)
  useLockBodyScroll(isScroll)

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

          <StyledSlider
            onTouchStart={(): void => setIsSctoll(true)}
            onTouchEnd={(): void => setIsSctoll(false)}
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
          </StyledSlider>
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
