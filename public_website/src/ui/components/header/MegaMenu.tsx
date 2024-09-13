import React, { useEffect, useRef } from 'react'
import styled, { css } from 'styled-components'

import { ButtonWithCTA } from '../buttonWithCTA/ButtonWithCTA'
import { Close } from '../icons/Close'
import { OutlinedText } from '../OutlinedText'
import { Typo } from '../typographies'
import HeaderBanner from './HeaderBanner'
import { CARD_BACKGROUNDS, ItemsTheme } from '@/theme/style'
import { MegaMenuProps } from '@/types/props'
import { Link } from '@/ui/components/Link'
import { parseText } from '@/utils/parseText'
import { isStringAreEquals } from '@/utils/stringAreEquals'

export function MegaMenu({
  onBlur,
  onKeyDown,
  onMouseLeave,
  getOpenButtonEl,
  id,
  labelId,
  data,
}: MegaMenuProps) {
  const {
    cta,
    title,
    bannerText,
    bannerAndroidUrl,
    bannerDefaultUrl,
    bannerIosUrl,
    primaryListItems,
    secondaryListItems,
    cardTitle,
    cardFirstEmoji,
    cardSecondEmoji,
    cardDescription,
    cardLink,
    theme,
  } = data

  const megaMenuRef = useRef<HTMLDivElement | null>(null)
  const closeMenuRef = useRef<HTMLButtonElement | null>(null)
  const backgroundCard = theme ?? 'gold'

  function onClickOutside(e: MouseEvent): void {
    if (
      !megaMenuRef.current?.contains(e.target as HTMLElement) &&
      closeMenuRef.current?.contains(e.target as HTMLButtonElement)
    ) {
      const openButtonElement = getOpenButtonEl()
      if (openButtonElement !== (e.target as HTMLElement)) {
        onBlur()
      }
    } else {
      const { nodeName } = e.target as HTMLElement

      if (
        nodeName === 'A' ||
        (e.target as HTMLElement).parentElement?.nodeName === 'A'
      ) {
        onBlur()
      }
    }
  }

  useEffect(() => {
    const megaMenuElement = megaMenuRef.current
    megaMenuElement?.addEventListener('keydown', (e: KeyboardEvent): void =>
      onKeyDown(e)
    )
    window?.addEventListener('click', onClickOutside)

    return () => {
      megaMenuElement?.removeEventListener(
        'keydown',
        (e: KeyboardEvent): void => onKeyDown(e)
      )
      window?.removeEventListener('click', onClickOutside)
    }
  })

  const primaryListItemsWithoutSimulator = React.useMemo(
    () =>
      primaryListItems.filter(
        (item) => !isStringAreEquals(item.Label, 'simulateur')
      ),
    [primaryListItems]
  )

  return (
    <React.Fragment>
      <BackgroundOverlay onMouseEnter={onBlur} />
      <StyledMegaMenuWrapper onMouseLeave={onMouseLeave}>
        <StyledMegaMenuClose>
          <StyledCloseButton
            ref={closeMenuRef}
            aria-label="Fermer le menu"
            aria-expanded="true"
            aria-controls="mobile-menu-main-navigation">
            <Close />
          </StyledCloseButton>
        </StyledMegaMenuClose>
        <StyledMegaMenu ref={megaMenuRef} id={id} aria-labelledby={labelId}>
          <StyledMegaMenuHeading>
            <Typo.Heading2 as="p">{title}</Typo.Heading2>
            <ButtonWithCTA cta={cta} />
            <HeaderBanner
              bannerAndroidUrl={bannerAndroidUrl}
              bannerDefaultUrl={bannerDefaultUrl}
              bannerIosUrl={bannerIosUrl}
              bannerText={bannerText}
            />
          </StyledMegaMenuHeading>

          <StyledMegaMenuLists>
            <ul>
              {primaryListItemsWithoutSimulator?.map((item) => {
                return (
                  <li key={item.Label}>
                    <Link
                      href={item.URL}
                      aria-label={parseText(item.Label).accessibilityLabel}>
                      {parseText(item.Label).processedText}
                    </Link>
                  </li>
                )
              })}
            </ul>
            <ul>
              {secondaryListItems?.map((item) => {
                return (
                  <li key={item.Label}>
                    <Link
                      href={item.URL}
                      aria-label={parseText(item.Label).accessibilityLabel}>
                      {parseText(item.Label).processedText}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </StyledMegaMenuLists>

          <StyledMegaMenuCard $backgroundColor={backgroundCard}>
            <StyledMegaMenuCardHeading>
              <OutlinedText innerAs="p" shadow={false}>
                {cardTitle}
              </OutlinedText>

              <OutlinedText shadow aria-hidden="true">
                {cardFirstEmoji}
              </OutlinedText>
              <OutlinedText shadow aria-hidden="true">
                {cardSecondEmoji}
              </OutlinedText>
            </StyledMegaMenuCardHeading>

            <p>{cardDescription}</p>
            <ButtonWithCTA cta={cardLink} variant="primary" />
          </StyledMegaMenuCard>
        </StyledMegaMenu>
      </StyledMegaMenuWrapper>
    </React.Fragment>
  )
}

const HEADER_HEIGHT = `calc(8rem)`

const BackgroundOverlay = styled.div`
  top: ${HEADER_HEIGHT};
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  pointer-events: none;
  z-index: 1;
`
const StyledMegaMenuWrapper = styled.div`
  ${({ theme }) => css`
    top: ${HEADER_HEIGHT};
    background: ${theme.colors.white};
    position: absolute;
    left: 0;
    right: 0;
    z-index: 2;
  `}
`
const StyledMegaMenuClose = styled.div`
  padding: 0 2.5rem 0;
  display: flex;
  justify-content: flex-end;
  max-width: 90rem;
  margin: 0 auto;
`
const StyledCloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 1.5rem;
  width: 1.75rem;
`
const StyledMegaMenu = styled.div`
  max-width: 90rem;
  margin-inline: auto;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr)); // Allow exact same width
  gap: 6.5rem;
  padding: 3.25rem 2.5rem;
`

const StyledMegaMenuHeading = styled.div`
  p + a {
    margin: 1.5rem 0 3rem;
  }
`

const StyledMegaMenuLists = styled.div`
  ${({ theme }) => css`
    position: relative;

    &::after {
      content: '';
      height: 100%;
      width: 0.0625rem;
      background-color: ${theme.colors.black};
      opacity: 0.2;
      position: absolute;
      left: -4rem;
      top: 0;
    }

    ul {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      &:not(:last-child) {
        margin-bottom: 3.75rem;
      }
    }

    a {
      font-size: ${theme.fonts.sizes.l};
      font-weight: ${theme.fonts.weights.semiBold};
      color: ${theme.colors.black};
      opacity: 0.9;
      &:hover {
        text-decoration: underline;
      }
    }
  `}
`

const StyledMegaMenuCard = styled.div<{ $backgroundColor: ItemsTheme }>`
  ${({ theme, $backgroundColor }) => css`
    background-color: ${CARD_BACKGROUNDS[$backgroundColor]};
    border-radius: ${theme.radius.sm};
    padding: 7.5rem 2.5rem 4.5rem;
    text-align: center;

    > p {
      color: ${theme.colors.black};
      font-size: ${theme.fonts.sizes.xl};
      font-weight: ${theme.fonts.weights.medium};
      margin-bottom: 3.75rem;
      line-height: 2;
    }
  `}
`

const StyledMegaMenuCardHeading = styled.div`
  ${({ theme }) => css`
    display: inline-flex;
    position: relative;
    margin-bottom: 4.5rem;

    p {
      line-height: 1;
      font-size: ${theme.fonts.sizes['5xl']};
      font-weight: ${theme.fonts.weights.black};
      color: ${theme.colors.black};
      transform: rotate(-2deg);
      z-index: 1;
      word-break: break-word;
    }

    span {
      font-size: ${theme.fonts.sizes['6xl']};
      position: absolute;
      top: -3rem;
      left: 1rem;
      transform: rotate(-10deg);

      &:last-child {
        top: auto;
        left: auto;
        bottom: -3.3rem;
        right: 1rem;
        z-index: 2;
      }

      @media (width < ${theme.mediaQueries.mobile}) {
        font-size: ${theme.fonts.sizes['4xl']};
      }
    }
  `}
`
