import React from 'react'
import styled, { css } from 'styled-components'

export function BackButton(props: { onClick: () => void }) {
  return (
    <StyledButton onClick={props.onClick}>
      <svg
        width="8"
        height="12"
        viewBox="0 0 8 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M7 1L2 6L6.5 10.5"
          stroke="black"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      Retour
    </StyledButton>
  )
}

const StyledButton = styled.button`
  ${({ theme }) => css`
    svg {
      margin-right: 0.625rem;
    }
    font-weight: ${theme.fonts.weights.medium};
  `}
`
