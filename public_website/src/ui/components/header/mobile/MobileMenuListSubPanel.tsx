import React, { useEffect, useRef, useState } from 'react'
import styled, { css } from 'styled-components'

import { OutlinedText } from '../../OutlinedText'
import { CTA } from '@/types/CTA'
import { Link } from '@/ui/components/Link'

type MobileMenuListSubPanelProps = {
  primaryList: CTA[]
  secondaryList: CTA[]
  cardTitle: string
  cardDescription: string
  cardLink: CTA
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
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    listRef.current?.focus()

    setTimeout(() => {
      setVisible(true)
    }, 0.0000001)
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
        {!visible && <div className="trigger"></div>}

        <StyledSubPanelCardTitle
          blurDeviation={2}
          className="SubPanel__title"
          innerAs="p">
          {cardTitle}
        </StyledSubPanelCardTitle>

        <p className="SubPanel__description">{cardDescription}</p>
        <OutlinedText blurDeviation={2} dilationRadius={5}>
          {cardFirstEmoji}
        </OutlinedText>
        <OutlinedText>{cardSecondEmoji}</OutlinedText>
      </StyledSubPanelCard>
    </div>
  )
}

const StyledSubPanelList = styled.ul<{ tabIndex?: number }>`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: 1.875rem;
    margin-bottom: 3.5rem;

    li {
      font-size: ${theme.fonts.sizes.xl};
      font-weight: ${theme.fonts.weights.semiBold};
      line-height: 0.95;
    }
  `}
`

const StyledSubPanelCardTitle = styled(OutlinedText)`
  ${({ theme }) => css`
    color: ${theme.colors.secondary} !important;
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

    .SubPanel__title {
      font-size: ${theme.fonts.sizes['4xl']};
      font-weight: ${theme.fonts.weights.black};
      margin-bottom: 1.5rem;
      color: white;
    }

    .SubPanel__description {
      color: ${theme.colors.white};
      font-size: ${theme.fonts.sizes.m};
      font-weight: ${theme.fonts.weights.semiBold};
    }

    .trigger {
      height: 0.1px;
    }
    span {
      font-size: 2.5rem;
      position: absolute;
      right: 3rem;
      top: 40%;
      transform: rotate(-10deg);

      &:last-child {
        right: 1rem;
        top: 45%;
        transform: rotate(10deg);
      }
    }
  `}
`
