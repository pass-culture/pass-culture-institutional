import React from 'react'
import styled from 'styled-components'

import { Step } from './Step'

export function Simulator() {
  return (
    <Root>
      <Steps>
        <Step circleText="01" surtitle="ÉTAPE 1" title="Ton âge" />
        <StepSeparator aria-hidden="true" />
        <Step
          circleText="02"
          surtitle="ÉTAPE 2"
          title="Ta nationalité"
          isActive
        />
      </Steps>
    </Root>
  )
}

const Root = styled.div``

const Steps = styled.ol``

const StepSeparator = styled.li`
  height: 36px;
  margin-top: 6px;
  margin-bottom: 6px;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    left: 23px;
    width: 2px;
    background-color: #cacbd2;
    border-radius: 1px;
  }
`
