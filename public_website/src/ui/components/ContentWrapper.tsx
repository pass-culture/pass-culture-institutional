// import React, { ReactNode} from "react"

import styled from 'styled-components'

// interface ContentWrapperProps {
//   children?: React.ReactNode
// }

// export function ContentWrapper(props: ContentWrapperProps) {
//   return <div></div>
// }

/*
  Figma grid:
    12 columns of 80px
    11 gutters of 23px (??)
    = 80*12+23*11 = 1213px = 75,8125rem

*/

export const ContentWrapper = styled.div`
  margin: auto;
  max-width: calc(var(--container-width, 75.8125rem) + 1.3rem);
  padding: 0 1.3rem;

  &:not(:last-child) {
    margin-bottom: 5rem;
  }
`
