import React, { useEffect, useMemo, useRef } from 'react'
import styled, { css } from 'styled-components'

import { CARD_BACKGROUNDS } from './const'
import { PiledCardItemsTheme } from './piled-card-items-theme'
import { PiledCardsCarousel } from './PiledCardsCarousel'
import { PiledCardsCarouselSlideProps, PiledCardsProps } from '@/types/props'
import { ContentWrapper } from '@/ui/components/ContentWrapper'
import { ArrowDown } from '@/ui/components/icons/ArrowDown'
import { OutlinedText } from '@/ui/components/OutlinedText'
import { Typo } from '@/ui/components/typographies'

type Direction = 'top' | 'bottom'

export function PiledCards(props: PiledCardsProps) {
  const { items } = props
  const itemRefs = useRef<(HTMLLIElement | null)[]>([])
  const sentinelRefs = useRef<(HTMLLIElement | null)[]>([])
  const refTop = useRef<number[]>([])

  useEffect(() => {
    refTop.current = []
    window.scrollTo({ top: 0 })
    for (const element of itemRefs.current) {
      const posY = element?.offsetTop
      if (posY) refTop.current.push(posY)
    }
    const setScrcoll = (): void => {
      for (let i = 0; i < itemRefs.current.length; i++) {
        const itemEl = itemRefs.current[i]
        const sentinelEl = sentinelRefs.current[i]
        if (!itemEl || !sentinelEl) continue

        const d = Math.max(
          0,
          Math.min(256, itemEl.offsetTop - sentinelEl.offsetTop - 128)
        )
        const ratio = (256 - d) / 256
        const easedValue = ratio * ratio

        const scaleDiff = 0.1
        const scale = 1 - scaleDiff + scaleDiff * easedValue

        itemEl.style.transform = `scale(${scale})`
      }
    }
    window.addEventListener('scroll', setScrcoll)
    return () => window.removeEventListener('scroll', setScrcoll)
  }, [])

  const ScrollTo = (index: number, direction: Direction): void => {
    const y =
      direction === 'bottom'
        ? refTop.current[index + 1]
        : refTop.current[index - 1]
    window.scrollTo({ top: y, behavior: 'smooth' })
  }

  const renderNav = (index: number): React.ReactNode => {
    if (index === 0)
      return (
        <StyledButton
          type="button"
          aria-label="Diapositive suivante"
          onClick={(): void => ScrollTo(index, 'bottom')}>
          <ArrowDown />
        </StyledButton>
      )
    if (index === items.length - 1) {
      return (
        <StyledButton
          type="button"
          aria-label="Diapositive précédente"
          $isReverse
          onClick={(): void => ScrollTo(index, 'top')}>
          <ArrowDown />
        </StyledButton>
      )
    }
    return (
      <React.Fragment>
        <StyledButton
          type="button"
          aria-label="Diapositive précédente"
          $isReverse
          onClick={(): void => ScrollTo(index, 'top')}>
          <ArrowDown />
        </StyledButton>
        <StyledButton
          type="button"
          aria-label="Diapositive suivante"
          onClick={(): void => ScrollTo(index, 'bottom')}>
          <ArrowDown />
        </StyledButton>
      </React.Fragment>
    )
  }

  const carouselItems = useMemo(() => {
    const itemsPiles: PiledCardsCarouselSlideProps[] = items.map((it, i) => ({
      slideIndex: i,
      ...it,
    }))
    return itemsPiles
  }, [items])

  return (
    <React.Fragment>
      <Root>
        {items?.map((item, index) => (
          <React.Fragment key={item.id}>
            <ItemScrollSentinel
              aria-hidden="true"
              // @ts-expect-error //main pull
              ref={(el) => (sentinelRefs.current[index] = el)}
            />
            <StyledContentListItems
              // @ts-expect-error //main pull
              ref={(el) => (itemRefs.current[index] = el)}
              $itemTheme={item.theme}
              aria-label={`Card ${index + 1}`}>
              <StyledImageWrapper>
                <StyledImage
                  src={item.image?.data?.attributes?.url}
                  alt={item.image?.data?.attributes?.alternativeText}
                />
                <StyledFirstEmoji aria-hidden="true">
                  <OutlinedText blurDeviation={1}>
                    {item.firstIcon}
                  </OutlinedText>
                </StyledFirstEmoji>
                <StyledSecondEmoji aria-hidden="true">
                  <OutlinedText blurDeviation={1}>
                    {item.secondIcon}
                  </OutlinedText>
                </StyledSecondEmoji>
              </StyledImageWrapper>

              <StyledContentTextWrapper>
                <div>
                  <p>{(index + 1).toString().padStart(2, '0')}</p>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <StyledNavWrapper>{renderNav(index)}</StyledNavWrapper>
              </StyledContentTextWrapper>
            </StyledContentListItems>
          </React.Fragment>
        ))}
      </Root>
      <StyledCarousel title={props.accessibleTitle} items={carouselItems} />
    </React.Fragment>
  )
}

const Root = styled(ContentWrapper)`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    margin-bottom: calc(var(--module-margin) - 8rem);
    @media (width < ${theme.mediaQueries.mobile}) {
      display: none;
    }
  `}
`

const StyledCarousel = styled(PiledCardsCarousel)`
  ${({ theme }) => css`
    margin-bottom: var(--module-margin);
    margin-top: var(--module-margin);

    @media (width >= ${theme.mediaQueries.mobile}) {
      display: none;
    }
  `}
`

const ItemScrollSentinel = styled.li`
  margin-bottom: 8rem;
  position: absolute;
  list-style: none;
`

const StyledContentListItems = styled.li<{
  $itemTheme: PiledCardItemsTheme
}>`
  ${({ $itemTheme, theme }) => css`
    transform-origin: center top;
    position: relative;
    list-style: none;
    background: ${CARD_BACKGROUNDS[$itemTheme]};
    height: 30rem;
    border-radius: 2rem;
    box-shadow: -4px 8px 24px 0px ${theme.colors.black + '22'};
    position: sticky;
    top: 2rem;
    display: grid;
    grid-template-columns: 1fr 1.5fr;
    gap: 5rem;
    padding: 5rem;
    margin-bottom: 8rem;

    @media (width < ${theme.mediaQueries.tablet}) {
      gap: 2rem;
    }
  `}
`

const StyledContentTextWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    align-items: center;
    justify-content: flex-start;
    overflow: hidden;

    h3 {
      font-size: ${theme.fonts.sizes['6xl']};
      font-weight: 700;
    }

    p {
      width: 80%;
      line-height: 2.125rem;
    }
  `}
`
const StyledNavWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;
  padding: 1rem;
`

const StyledButton = styled.button<{ $isReverse?: boolean }>`
  ${({ theme, $isReverse }) => css`
    width: 3.4375rem;
    height: 3.4375rem;
    max-width: 3.4375rem;
    max-height: 3.4375rem;
    min-width: 3.4375rem;
    min-height: 3.4375rem;
    background-color: transparent;
    position: relative;
    border-radius: 100%;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid white;
    outline-offset: 2px;
    z-index: 1000;
    transform: translateY(0) rotate(0deg);
    ${$isReverse && 'transform:translateY(0) rotate(180deg);'}

    svg {
      will-change: transform;
      transition: transform 0.2s linear;
    }
    ${$isReverse &&
    `&:hover {
      svg {
        transform: translateY(-5px) rotate(0deg);
      }
    }`}

    &:hover {
      svg {
        transform: translateY(5px) rotate(0deg);
      }
    }

    &:active {
      outline: 2px solid ${theme.colors.secondary};
    }
  `}
`

const StyledImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 1rem;
`

const StyledFirstEmoji = styled(Typo.Emoji)`
  ${({ theme }) => css`
    position: absolute;
    top: 4rem;
    right: 0;
    transform: rotate(8.7deg) translateX(2rem);

    @media (width < ${theme.mediaQueries.tablet}) {
      font-size: ${theme.fonts.sizes['2xl']};
      transform: rotate(8.7deg) translateX(1rem);
    }
  `}
`
const StyledSecondEmoji = styled(Typo.Emoji)`
  ${({ theme }) => css`
    position: absolute;
    bottom: 4rem;
    left: 0;
    transform: rotate(-8.7deg) translateX(-2rem);

    @media (width < ${theme.mediaQueries.tablet}) {
      font-size: ${theme.fonts.sizes['2xl']};
      transform: rotate(8.7deg) translateX(-1rem);
    }
  `}
`
