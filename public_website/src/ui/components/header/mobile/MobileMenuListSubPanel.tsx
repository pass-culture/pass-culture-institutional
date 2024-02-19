import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import styled, { css } from 'styled-components'

type MobileMenuListSubPanelProps = {
  primaryList: { Label: string; URL: string }[]
  secondaryList: { Label: string; URL: string }[]
  cardTitle: string
  cardDescription: string
  cardLink: { Label: string; URL: string }
  cardFirstEmoji: string
  cardSecondEmoji: string
}

export function MobileMenuListSubPanel({
  primaryList,
  secondaryList,
  cardTitle,
  cardDescription,
  cardLink,
  cardFirstEmoji,
  cardSecondEmoji,
}: MobileMenuListSubPanelProps) {
  // Focus list on mount
  const listRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    listRef.current?.focus()
  }, [])

  return (
    <div>
      <StyledSubPanelList
        ref={listRef}
        tabIndex={0}
        aria-labelledby="sub-panel-title">
        {primaryList.map((item) => {
          return (
            <li key={item.Label}>
              <Link href={item.URL}>{item.Label}</Link>
            </li>
          )
        })}
      </StyledSubPanelList>
      <StyledSubPanelList>
        {secondaryList.map((item) => {
          return (
            <li key={item.Label}>
              <Link href={item.URL}>{item.Label}</Link>
            </li>
          )
        })}
      </StyledSubPanelList>
      <StyledSubPanelCard href={cardLink.URL}>
        <p>{cardTitle}</p>
        <p>{cardDescription}</p>
        <span>{cardFirstEmoji}</span>
        <span>{cardSecondEmoji}</span>
      </StyledSubPanelCard>
    </div>
  )
}

const StyledSubPanelList = styled.ul<{ tabIndex?: number }>`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin-bottom: 3.5rem;

    li {
      font-size: ${theme.fonts.sizes.xl};
      font-weight: ${theme.fonts.weights.semiBold};
    }
  `}
`

const StyledSubPanelCard = styled(Link)`
  ${({ theme }) => css`
    background-color: ${theme.colors.secondary};
    display: block;
    padding: 1.5rem;
    border-radius: 0.5rem;
    color: ${theme.colors.white};
    padding-right: 30%;
    position: relative;

    p:first-child {
      font-size: ${theme.fonts.sizes['4xl']};
      font-weight: ${theme.fonts.weights.black};
      margin-bottom: 1.5rem;
    }

    p:nth-child(2) {
      color: ${theme.colors.white};
      font-size: ${theme.fonts.sizes.m};
      font-weight: ${theme.fonts.weights.semiBold};
    }

    span {
      font-size: 2.5rem;
      position: absolute;
      right: 6rem;
      top: 40%;
      transform: rotate(-10deg);

      &:last-child {
        right: 4rem;
        top: 45%;
        transform: rotate(10deg);
      }
    }
  `}
`
