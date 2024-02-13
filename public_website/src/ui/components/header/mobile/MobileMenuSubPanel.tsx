import React from 'react'
import Image from 'next/image'
import styled, { css } from 'styled-components'

import ArrowRight from '../../../../../public/images/arrow-right.svg'

type MobileMenuSubPanelProps = {
  onClose: () => void
  title: string
  children: React.ReactNode
}

export function MobileMenuSubPanel({
  onClose,
  title,
  children,
}: MobileMenuSubPanelProps) {
  return (
    <StyledMobileMenuSubPanel>
      <button onClick={onClose}>
        <Image src={ArrowRight} alt="" />
        Retour <span className="visually-hidden">au menu principal</span>
      </button>

      <p>{title}</p>
      <span aria-hidden="true" />

      {children}
    </StyledMobileMenuSubPanel>
  )
}

const StyledMobileMenuSubPanel = styled.div`
  ${({ theme }) => css`
    padding: 1rem;

    button {
      color: ${theme.colors.primary};
      display: flex;
      align-items: center;
      gap: 1.25rem;
      text-decoration: underline;
      margin-bottom: 1.5rem;

      img {
        transform: rotate(180deg);
      }
    }

    > p {
      color: ${theme.colors.primary};
      font-size: ${theme.fonts.sizes.xl};
      font-weight: ${theme.fonts.weights.semiBold};
      margin-bottom: 1.5rem;
    }

    > span {
      background-color: ${theme.colors.black};
      display: inline-block;
      margin-bottom: 2rem;
      height: 1px;
      width: 4rem;
      opacity: 0.2;
    }
  `}
`
