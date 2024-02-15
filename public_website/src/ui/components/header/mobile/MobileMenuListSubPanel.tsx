import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import styled, { css } from 'styled-components'

type MobileMenuListSubPanelProps = {
  PrimaryList: { Label: string; URL: string }[]
  SecondaryList: { Label: string; URL: string }[]
  CardTitle: string
  CardDescription: string
  CardLink: { Label: string; URL: string }
  CardFirstEmoji: string
  CardSecondEmoji: string
}

export function MobileMenuListSubPanel({
  PrimaryList,
  SecondaryList,
  CardTitle,
  CardDescription,
  CardLink,
  CardFirstEmoji,
  CardSecondEmoji,
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
        {PrimaryList.map((item) => {
          return (
            <li key={item.Label}>
              <Link href={item.URL}>{item.Label}</Link>
            </li>
          )
        })}
      </StyledSubPanelList>
      <StyledSubPanelList>
        {SecondaryList.map((item) => {
          return (
            <li key={item.Label}>
              <Link href={item.URL}>{item.Label}</Link>
            </li>
          )
        })}
      </StyledSubPanelList>
      <StyledSubPanelCard href={CardLink.URL}>
        <p>{CardTitle}</p>
        <p>{CardDescription}</p>
        <span>{CardFirstEmoji}</span>
        <span>{CardSecondEmoji}</span>
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
