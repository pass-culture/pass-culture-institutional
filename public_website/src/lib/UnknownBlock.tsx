import React from 'react'
import styled from 'styled-components'

import type { Block } from './BlockRenderer'

export default function UnkwnownBlock(props: { block: Block }) {
  // Doesnt render anything in production, just in case...
  if (process.env.NODE_ENV === 'production') {
    return null
  }

  return (
    <UnkownBlockContainer data-testid="unknown-block">
      <p>
        Unknown block <code>{props.block.__component}</code>
      </p>

      <pre>
        <code>{JSON.stringify(props, null, 2)}</code>
      </pre>
    </UnkownBlockContainer>
  )
}

const UnkownBlockContainer = styled.div`
  border: solid 2px red;
  background-color: #fdd;
`
