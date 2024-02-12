import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import styled from 'styled-components'

type MegaMenuProps = {
  onBlur: () => void
  onKeyDown: (e: KeyboardEvent | React.KeyboardEvent) => void
  getOpenButtonEl: () => HTMLButtonElement | null
  id: string
  labelId: string
  data: {
    heading: string
    cta: { label: string; url: string }
    mainList: { label: string; url: string }[]
    secondaryList: { label: string; url: string }[]
    cardTitle: string
    cardDescription: string
    cardLink: { label: string; url: string }
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
      <div className="heading">
        <p>{data.heading}</p>
        <Link href={data.cta.url}>{data.cta.label}</Link>
      </div>

      <div className="list">
        <ul>
          {data.mainList.map((item, i) => {
            return (
              <li key={i}>
                <Link href={item.url}>{item.label}</Link>
              </li>
            )
          })}
        </ul>
        <ul>
          {data.secondaryList.map((item, i) => {
            return (
              <li key={i}>
                <Link href={item.url}>{item.label}</Link>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="card">
        <p>{data.cardTitle}</p>
        <p>{data.cardDescription}</p>
        <Link href={data.cardLink.url}>{data.cardLink.label}</Link>
      </div>
    </StyledMegaMenu>
  )
}

const StyledMegaMenu = styled.section`
  background-color: #f5f2fa;
  position: absolute;
  left: 0;
  right: 0;
  top: calc(4rem + 4rem);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6.5rem;
  padding: 6.25rem 2.5rem 8.125rem;

  .heading {
    p {
      color: ${(props) => props.theme.colors.hardBlue};
      font-size: var(--fs-40);
      font-weight: 700;
      line-height: 1.25;
      margin-bottom: 1.25rem;
    }
  }

  .list {
    position: relative;

    ul {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      margin-bottom: 3.75rem;

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
      font-size: ${(props) => props.theme.fonts.sizes[17]};
      font-weight: ${(props) => props.theme.fonts.weights.semiBold};
      color: ${(props) => props.theme.colors.black};
      opacity: 0.9;
    }
  }

  .card {
    background-color: ${(props) => props.theme.colors.hardBlue};
    border-radius: 0.5rem;
    padding: 7.5rem 3.5rem 4.5rem;
    text-align: center;

    p:first-child {
      color: ${(props) => props.theme.colors.hardBlue};
      -webkit-text-stroke: 1px white;
      font-size: var(--fs-35);
      font-weight: ${(props) => props.theme.fonts.weights.black};
      margin-bottom: 4.5rem;
    }

    p:nth-child(2) {
      color: ${(props) => props.theme.colors.white};
      font-size: ${(props) => props.theme.fonts.sizes[18]};
      font-weight: ${(props) => props.theme.fonts.weights.medium};
      margin-bottom: 3.75rem;
    }
  }
`
