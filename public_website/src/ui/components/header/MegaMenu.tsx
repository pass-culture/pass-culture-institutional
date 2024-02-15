import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import styled, { css } from 'styled-components'

import { AppBanner } from '../app-banner/AppBanner'
import { Button } from '../button/Button'

type MegaMenuProps = {
  onBlur: () => void
  onKeyDown: (e: KeyboardEvent) => void
  getOpenButtonEl: () => HTMLButtonElement | null
  id: string
  labelId: string
  data: {
    Title: string
    Cta: { Label: string; URL: string }
    BannerText?: string
    PrimaryListItems: { Label: string; URL: string }[]
    SecondaryListItems: { Label: string; URL: string }[]
    CardTitle: string
    CardDescription: string
    CardLink: { Label: string; URL: string }
    CardFirstEmoji: string
    CardSecondEmoji: string
  }
}

export function MegaMenu({
  onBlur,
  onKeyDown,
  getOpenButtonEl,
  id,
  labelId,
  data,
}: MegaMenuProps) {
  const megaMenuRef = useRef<HTMLElement>(null)

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
    <StyledMegaMenu ref={megaMenuRef} id={id} aria-labelledby={labelId}>
      <StyledMegaMenuHeading>
        <p>{data.Title}</p>
        <Button href={data.Cta.URL}>{data.Cta.Label}</Button>
        {data.BannerText && <AppBanner title={data.BannerText} url="#" />}
      </StyledMegaMenuHeading>

      <StyledMegaMenuLists>
        <ul>
          {data.PrimaryListItems.map((item) => {
            return (
              <li key={item.Label}>
                <Link href={item.URL}>{item.Label}</Link>
              </li>
            )
          })}
        </ul>
        <ul>
          {data.SecondaryListItems.map((item) => {
            return (
              <li key={item.Label}>
                <Link href={item.URL}>{item.Label}</Link>
              </li>
            )
          })}
        </ul>
      </StyledMegaMenuLists>

      <StyledMegaMenuCard>
        <StyledMegaMenuCardHeading>
          <p>{data.CardTitle}</p>

          <span>{data.CardFirstEmoji}</span>
          <span>{data.CardSecondEmoji}</span>
        </StyledMegaMenuCardHeading>
        <p>{data.CardDescription}</p>
        <Button href={data.CardLink.URL} variant="secondary">
          {data.CardLink.Label}
        </Button>
      </StyledMegaMenuCard>
    </StyledMegaMenu>
  )
}

const StyledMegaMenu = styled.section`
  ${({ theme }) => css`
    background-color: ${theme.colors.sectionBackground};
    position: absolute;
    left: 0;
    right: 0;
    top: calc(4rem + 4rem);
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 6.5rem;
    padding: 6.25rem 2.5rem 8.125rem;
  `}
`

const StyledMegaMenuHeading = styled.div`
  ${({ theme }) => css`
    > p {
      color: ${theme.colors.secondary};
      font-size: ${theme.fonts.sizes['6xl']};
      font-weight: ${theme.fonts.weights.bold};
      line-height: 1.25;
    }

    p + a {
      margin: 1.5rem 0 3rem;
    }
  `}
`

const StyledMegaMenuLists = styled.div`
  ${({ theme }) => css`
    position: relative;

    ul {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;

      &:not(:last-child) {
        margin-bottom: 3.75rem;
      }

      &::after {
        content: '';
        height: 100%;
        width: 1px;
        background: #3a116d;
        opacity: 0.1;
        position: absolute;
        left: -4rem;
      }
    }

    a {
      font-size: ${theme.fonts.sizes.l};
      font-weight: ${theme.fonts.weights.semiBold};
      color: ${theme.colors.black};
      opacity: 0.9;
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
      color: ${theme.colors.white};
      font-size: ${theme.fonts.sizes['5xl']};
      font-weight: ${theme.fonts.weights.black};
      z-index: 1;
    }

    span {
      font-size: 1.75rem;
      position: absolute;
      top: -1rem;
      left: 1rem;
      transform: rotate(-10deg);
      z-index: 0;

      &:last-child {
        top: auto;
        left: auto;
        bottom: -1rem;
        right: 1rem;
      }
    }
  `}
`
