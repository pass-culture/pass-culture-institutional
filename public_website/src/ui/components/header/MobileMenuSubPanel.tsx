import React from 'react'
import styled, { css } from 'styled-components'

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
      <button onClick={onClose}>Retour</button>
      <p>{title}</p>
      <hr />
      {children}
    </StyledMobileMenuSubPanel>
  )
}

const StyledMobileMenuSubPanel = styled.div`
  ${({ theme }) => css`
    padding: 1rem;
  `}
`
