import React from 'react'
import Link from 'next/link'
import styled, { css } from 'styled-components'

type MobileMenuListSubPanelProps = {
  PrimaryList: { Label: string; URL: string }[]
  SecondaryList: { Label: string; URL: string }[]
  CardTitle: string
  CardDescription: string
  CardLink: { Label: string; URL: string }
}

export function MobileMenuListSubPanel({
  PrimaryList,
  SecondaryList,
  CardTitle,
  CardDescription,
  CardLink,
}: MobileMenuListSubPanelProps) {
  return (
    <div>
      <StyledSubPanelList>
        {PrimaryList.map((item, i) => {
          return (
            <li key={i}>
              <Link href={item.URL}>{item.Label}</Link>
            </li>
          )
        })}
      </StyledSubPanelList>
      <StyledSubPanelList>
        {SecondaryList.map((item, i) => {
          return (
            <li key={i}>
              <Link href={item.URL}>{item.Label}</Link>
            </li>
          )
        })}
      </StyledSubPanelList>
      <StyledSubPanelCard href={CardLink.URL}>
        <p>{CardTitle}</p>
        <p>{CardDescription}</p>
        <span>emoji</span>
      </StyledSubPanelCard>
    </div>
  )
}

const StyledSubPanelList = styled.ul`
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
    display: grid;
    grid-template-columns: 3fr 1.5fr;
    grid-template-areas:
      'title emojis'
      'description emojis';
    gap: 0.5rem 1rem;
    padding: 1.5rem;
    border-radius: 0.5rem;

    p:first-child {
      color: ${theme.colors.secondary};
      -webkit-text-stroke: 1px white;
      font-size: ${theme.fonts.sizes['4xl']};
      font-weight: ${theme.fonts.weights.black};
      grid-area: title;
    }

    p:nth-child(2) {
      color: ${theme.colors.white};
      font-size: ${theme.fonts.sizes.m};
      font-weight: ${theme.fonts.weights.semiBold};
      grid-area: description;
    }

    span {
      grid-area: emojis;
    }
  `}
`
