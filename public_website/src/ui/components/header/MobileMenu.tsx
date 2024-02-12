import React from 'react'
import styled from 'styled-components'

export function MobileMenu() {
  return (
    <StyledMobileMenuWrapper>
      <button>he</button>
    </StyledMobileMenuWrapper>
  )
}

const StyledMobileMenuWrapper = styled.div`
  background: pink;
  position: fixed;
  top: 7rem;
  bottom: 0;
  left: 0;
  right: 0;
`
