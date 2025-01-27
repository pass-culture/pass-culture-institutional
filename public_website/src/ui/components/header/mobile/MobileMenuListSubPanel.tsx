import React, { useEffect, useRef, useState } from 'react'
import styled, { css } from 'styled-components'

import { OutlinedText } from '../../OutlinedText'
import {
  ComponentHeaderMegaMenuFragment,
  Enum_Componentheadermegamenu_Theme,
} from '@/generated/graphql'
import { CARD_BACKGROUNDS } from '@/theme/style'
import { Link } from '@/ui/components/Link'

export function MobileMenuListSubPanel(props: ComponentHeaderMegaMenuFragment) {
  const {
    primaryListItems,
    secondaryListItems,
    cardTitle,
    cardDescription,
    cardLink,
    cardFirstEmoji,
    cardSecondEmoji,
    theme,
  } = props

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
        {primaryListItems.map((item) => {
          return (
            <li key={item?.Label}>
              <Link href={item?.URL ?? ''}>{item?.Label}</Link>
            </li>
          )
        })}
      </StyledSubPanelList>
      <StyledSubPanelList>
        {secondaryListItems?.map((item) => {
          return (
            <li key={item?.Label}>
              <Link href={item?.URL ?? ''}>{item?.Label}</Link>
            </li>
          )
        })}
      </StyledSubPanelList>
      <StyledSubPanelCard
        $backgroundColor={
          theme ?? Enum_Componentheadermegamenu_Theme.Aquamarine
        }
        href={cardLink.URL}>
        {!visible && <div className="trigger"></div>}

        <StyledSubPanelCardTitle
          shadow={false}
          className="SubPanel__title"
          innerAs="p">
          {cardTitle}
        </StyledSubPanelCardTitle>

        <p className="SubPanel__description">{cardDescription}</p>
        <OutlinedText>{cardFirstEmoji}</OutlinedText>
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
      line-height: ${theme.fonts.sizes['4xl']};
    }
  `}
`

const StyledSubPanelCardTitle = styled(OutlinedText)`
  ${({ theme }) => css`
    color: ${theme.colors.black};
  `}
`

const StyledSubPanelCard = styled(Link)<{
  $backgroundColor: Enum_Componentheadermegamenu_Theme
}>`
  ${({ theme, $backgroundColor }) => css`
    background-color: ${CARD_BACKGROUNDS[
      $backgroundColor as Enum_Componentheadermegamenu_Theme
    ]};
    display: block;
    padding: 1.5rem;
    border-radius: ${theme.radius.sm};
    padding-right: 30%;
    position: relative;

    .SubPanel__title {
      font-size: ${theme.fonts.sizes['4xl']};
      font-weight: ${theme.fonts.weights.black};
      margin-bottom: 1.5rem;
      top: -1rem;
      position: relative;
      transform: rotate(-2deg);
    }

    .SubPanel__description {
      color: ${theme.colors.black};
      font-size: ${theme.fonts.sizes.m};
      font-weight: ${theme.fonts.weights.semiBold};
    }

    .trigger {
      height: 0.0063rem;
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
