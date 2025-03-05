import React from 'react'
import styled from 'styled-components'

import Accordion from './Accordion'
import { SimpleTextV2 } from './SimpleTextV2'
import { AccordionsListProps } from '@/types/props'

const AccordionsWrapper = styled.div`
  max-width: 75rem;
  margin: 0 auto;
  padding: 2rem 2rem;
`

export default function AccordionsList({
  accordions,
  simpleText,
}: AccordionsListProps) {
  return (
    <React.Fragment>
      {!!simpleText && <SimpleTextV2 {...simpleText} padding={false} />}
      <AccordionsWrapper>
        {accordions?.map((accordion) => (
          <Accordion
            key={accordion.title}
            title={accordion.title}
            simpleText={accordion.simpleText}
          />
        ))}
      </AccordionsWrapper>
    </React.Fragment>
  )
}
