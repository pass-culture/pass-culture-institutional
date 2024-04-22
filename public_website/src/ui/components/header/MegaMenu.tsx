import React, { useEffect, useRef } from 'react'
import styled, { css } from 'styled-components'

import { AppBanner } from '../app-banner/AppBanner'
import { ButtonWithCTA } from '../buttonWithCTA/ButtonWithCTA'
import { OutlinedText } from '../OutlinedText'
import { Typo } from '../typographies'
import { onClickAnalytics } from '@/lib/analytics/helpers'
import { CTA } from '@/types/CTA'
import { Link } from '@/ui/components/Link'

type MegaMenuProps = {
  onBlur: () => void
  onKeyDown: (e: KeyboardEvent) => void
  onMouseLeave: () => void
  getOpenButtonEl: () => HTMLButtonElement | null
  id: string
  labelId: string
  data: {
    title: string
    cta: CTA
    bannerText?: string
    primaryListItems: CTA[]
    secondaryListItems: CTA[]
    cardTitle: string
    cardDescription: string
    cardLink: CTA
    cardFirstEmoji: string
    cardSecondEmoji: string
  }
}

export function MegaMenu({
  onBlur,
  onKeyDown,
  onMouseLeave,
  getOpenButtonEl,
  id,
  labelId,
  data,
}: MegaMenuProps) {
  const megaMenuRef = useRef<HTMLDivElement>(null)

  function onClickOutside(e: MouseEvent) {
    if (!megaMenuRef.current?.contains(e.target as HTMLElement)) {
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
    megaMenuElement?.addEventListener('keydown', (e: KeyboardEvent) =>
      onKeyDown(e)
    )
    window?.addEventListener('click', onClickOutside)

    return () => {
      megaMenuElement?.removeEventListener('keydown', (e: KeyboardEvent) =>
        onKeyDown(e)
      )
      window?.removeEventListener('click', onClickOutside)
    }
  })

  return (
    <StyledMegaMenuWrapper onMouseLeave={onMouseLeave}>
      <StyledMegaMenu ref={megaMenuRef} id={id} aria-labelledby={labelId}>
        <StyledMegaMenuHeading>
          <Typo.Heading2 as={'p'}>{data.title}</Typo.Heading2>
          <ButtonWithCTA cta={data.cta} />
          {data.bannerText && (
            <AppBanner
              title={data.bannerText}
              url={data.cta.URL}
              onClick={() =>
                onClickAnalytics({
                  eventName: 'downloadApp',
                  eventOrigin: 'menu',
                })
              }
            />
          )}
        </StyledMegaMenuHeading>

        <StyledMegaMenuLists>
          <ul>
            {data.primaryListItems.map((item) => {
              return (
                <li key={item.Label}>
                  <Link
                    href={item.URL}
                    dangerouslySetInnerHTML={{ __html: item.Label }}
                  />
                </li>
              )
            })}
          </ul>
          <ul>
            {data.secondaryListItems.map((item) => {
              return (
                <li key={item.Label}>
                  <Link
                    href={item.URL}
                    dangerouslySetInnerHTML={{ __html: item.Label }}
                  />
                </li>
              )
            })}
          </ul>
        </StyledMegaMenuLists>

        <StyledMegaMenuCard>
          <StyledMegaMenuCardHeading>
            <OutlinedText innerAs={'p'}>{data.cardTitle}</OutlinedText>

            <OutlinedText dilationRadius={1} shadow aria-hidden="true">
              {data.cardFirstEmoji}
            </OutlinedText>
            <OutlinedText dilationRadius={1} shadow aria-hidden="true">
              {data.cardSecondEmoji}
            </OutlinedText>
          </StyledMegaMenuCardHeading>

          <p>{data.cardDescription}</p>
          <ButtonWithCTA cta={data.cardLink} variant="secondary" />
        </StyledMegaMenuCard>
      </StyledMegaMenu>
    </StyledMegaMenuWrapper>
  )
}

const StyledMegaMenuWrapper = styled.div`
  ${({ theme }) => css`
    background: linear-gradient(
      to bottom,
      ${theme.colors.lightBlue},
      ${theme.colors.white}
    );
    position: absolute;
    left: 0;
    right: 0;
    top: calc(4rem + 4rem);
    z-index: 2;
  `}
`

const StyledMegaMenu = styled.div`
  max-width: 90rem;
  margin-inline: auto;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr)); // Allow exact same width
  gap: 6.5rem;
  padding: 4.25rem 2.5rem 8.125rem;
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
      width: 1px;
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

const StyledMegaMenuCard = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.secondary};
    border-radius: 0.5rem;
    padding: 7.5rem 3.5rem 4.5rem;
    text-align: center;

    > p {
      color: ${theme.colors.white};
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
      color: ${theme.colors.secondary};
      transform: rotate(-2deg);
      z-index: 1;
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
