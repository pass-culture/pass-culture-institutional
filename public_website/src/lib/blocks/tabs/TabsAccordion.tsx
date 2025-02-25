import React from 'react'

import AccordionsList from '../AccordionsList'
import Tabs from './Tabs'
import { TabAccordionProps } from '@/types/props'

const TabsAccordion = (props: TabAccordionProps) => {
  return (
    <Tabs {...props}>
      {props.tab[0] && (
        <AccordionsList
          accordions={props.tab[0].block.accordions ?? []}
          simpleText={props.tab[0].block.simpleText}
        />
      )}
    </Tabs>
  )
}

export default TabsAccordion
