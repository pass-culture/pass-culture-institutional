import React, { useEffect, useState } from 'react'
import {
  ButtonBack,
  ButtonNext,
  CarouselProvider,
  Dot,
  Slider,
} from 'pure-react-carousel'
import styled, { css } from 'styled-components'

import { ArrowRight } from '../../../ui/components/icons/ArrowRight'
import { Typo } from '../../../ui/components/typographies'
import {
  VerticalCarouselSlide,
  VerticalCarouselSlideProps,
} from './VerticalCarouselSlide'
import { MediaQueries } from '@/theme/media-queries'
import { ContentWrapper } from '@/ui/components/ContentWrapper'
import { getMediaQuery } from '@/utils/getMediaQuery'
import { stripTags } from '@/utils/stripTags'

export type VerticalCarouselProps = {
  title: string
  items: Omit<VerticalCarouselSlideProps, 'slideIndex'>[]
}

export function VerticalCarousel({ title, items }: VerticalCarouselProps) {
  items = items.filter((item) => {
    return item.image && item.image !== ''
  })

  const CAROUSEL_SELECTOR = `[aria-roledescription="carrousel"][aria-label="${stripTags(
    title
  )}"]`
  const SLIDES_SELECTOR = '[aria-roledescription="diapositive"]'

  // Computed the number of visible slides depending on screen width
  const [screenWidth, setScreenWidth] = useState<number>()

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth)

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Get the MQ in rem and convert it in pixels
  const visibleSlides =
    screenWidth && screenWidth < getMediaQuery(MediaQueries.MOBILE) ? 1 : 4

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

  function cleanSlideAttributes(
    carouselEl: Element,
    slidesEl: NodeListOf<Element>
  ) {
    carouselEl?.removeAttribute('tabindex')
    carouselEl?.removeAttribute('aria-live')

    slidesEl.forEach((slideEl) => {
      slideEl.removeAttribute('tabindex')
      slideEl.removeAttribute('aria-selected')
    })
  }

  // Remove attributes when clicking "previous", "next" and dots buttons
  function handleNavigationButtonClick() {
    const carouselEl = document.querySelector(CAROUSEL_SELECTOR)
    const carouselSlidesEl = carouselEl?.querySelectorAll(SLIDES_SELECTOR)

    if (carouselEl && carouselSlidesEl) {
      setTimeout(() => {
        cleanSlideAttributes(carouselEl, carouselSlidesEl)
      }, 1)
    }
  }

  return (
    <Root>
      <ContentWrapper>
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

            <StyledNavigationButtons
              role="group"
              aria-label="Contrôles du carousel">
              <ButtonBack
                aria-label="Élement précédent"
                onClick={handleNavigationButtonClick}>
                <ArrowRight />
              </ButtonBack>
              <ButtonNext
                aria-label="Élément suivant"
                onClick={handleNavigationButtonClick}>
                <ArrowRight />
              </ButtonNext>
            </StyledNavigationButtons>
          </StyledHeading>

          <Slider
            role="region"
            aria-label={stripTags(title)}
            aria-roledescription="carrousel">
            {items.map((item, index) => {
              return (
                <VerticalCarouselSlide
                  key={item.title}
                  slideIndex={index}
                  {...item}
                />
              )
            })}
          </Slider>

          <StyledDots role="group" aria-label="Contrôles du carousel">
            {items.map((item, index) => {
              return (
                <StyledDot
                  onClick={handleNavigationButtonClick}
                  key={item.title}
                  slide={index}
                  aria-label={`Afficher la diapositive ${index + 1} sur ${
                    items.length
                  } : ${item.title}`}
                />
              )
            })}
          </StyledDots>
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
      &:hover {
        box-shadow: none;
        filter: drop-shadow(-4px 8px 24px rgba(0, 0, 0, 0.15));
      }
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 3.625rem;
      width: 3.625rem;
      cursor: pointer;
      transition: all 0.3s ease-in-out;
      &:focus {
        outline: 2px solid ${theme.colors.primary};
      }
    }

    button:first-child {
      svg {
        transform: rotate(180deg);
      }
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
