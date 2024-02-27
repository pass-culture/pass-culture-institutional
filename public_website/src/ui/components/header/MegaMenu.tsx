import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import styled, { css } from 'styled-components'

import { AppBanner } from '../app-banner/AppBanner'
import { Button } from '../button/Button'
import { Typo } from '../typographies'

type MegaMenuProps = {
  onBlur: () => void
  onKeyDown: (e: KeyboardEvent) => void
  getOpenButtonEl: () => HTMLButtonElement | null
  id: string
  labelId: string
  data: {
    title: string
    cta: { Label: string; URL: string }
    bannerText?: string
    primaryListItems: { Label: string; URL: string }[]
    secondaryListItems: { Label: string; URL: string }[]
    cardTitle: string
    cardDescription: string
    cardLink: { Label: string; URL: string }
    cardFirstEmoji: string
    cardSecondEmoji: string
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
    <StyledMegaMenuWrapper>
      <StyledMegaMenu ref={megaMenuRef} id={id} aria-labelledby={labelId}>
        <StyledMegaMenuHeading>
          <Typo.Heading2 as={'p'}>{data.title}</Typo.Heading2>
          <Button href={data.cta.URL}>{data.cta.Label}</Button>
          {data.bannerText && <AppBanner title={data.bannerText} url="#" />}
        </StyledMegaMenuHeading>

        <StyledMegaMenuLists>
          <ul>
            {data.primaryListItems.map((item) => {
              return (
                <li key={item.Label}>
                  <Link href={item.URL}>{item.Label}</Link>
                </li>
              )
            })}
          </ul>
          <ul>
            {data.secondaryListItems.map((item) => {
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
            <Typo.BorderedText>{data.cardTitle}</Typo.BorderedText>

            <Typo.Emoji aria-hidden="true">{data.cardFirstEmoji}</Typo.Emoji>
            <Typo.Emoji aria-hidden="true">{data.cardSecondEmoji}</Typo.Emoji>
          </StyledMegaMenuCardHeading>
          <p>{data.cardDescription}</p>
          <Button href={data.cardLink.URL} variant="secondary">
            {data.cardLink.Label}
          </Button>
        </StyledMegaMenuCard>
      </StyledMegaMenu>
    </StyledMegaMenuWrapper>
  )
}

const StyledMegaMenuWrapper = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.lightBlue};
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
  grid-template-columns: repeat(3, 1fr);
  gap: 6.5rem;
  padding: 6.25rem 2.5rem 8.125rem;
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
      gap: 1.5rem;

      &:not(:last-child) {
        margin-bottom: 3.75rem;
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
      z-index: 1;
    }

    span {
      font-size: ${theme.fonts.sizes['6xl']};
      position: absolute;
      top: -1rem;
      left: 1rem;
      transform: rotate(-10deg);

      &:last-child {
        top: auto;
        left: auto;
        bottom: -1rem;
        right: 1rem;
      }
    }
  `}
`
