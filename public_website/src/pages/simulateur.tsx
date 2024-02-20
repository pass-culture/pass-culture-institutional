import React from 'react'
import styled from 'styled-components'

import { Simulator } from '@/ui/components/simulator/Simulator'

// interface SimulatorProps {}

export default function SimulatorPage(/* props: SimulatorProps */) {
  return (
    <Root>
      <h1>
        <mark>Simulateur</mark> d&apos;éligibilité
      </h1>
      <p>
        Tu veux savoir si tu as droit au pass Culture, à combien tu peux
        prétendre et comment débloquer ton crédit ? C&apos;est par ici !
      </p>

      <div>BREADCRUMB ICI</div>

      <StyledSimulator />
    </Root>
  )
}

const Root = styled.div`
  max-width: calc(1200px + 2rem);
  margin: auto;
  padding: 2rem;
`

const StyledSimulator = styled(Simulator)`
  margin-top: 7rem;
`
