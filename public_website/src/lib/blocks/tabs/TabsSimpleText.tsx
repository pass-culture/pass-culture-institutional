import React from 'react'

import { SimpleTextV2 } from '../SimpleTextV2'
import Tabs from './Tabs'
import { TabSimpleTextProps } from '@/types/props'

const TabsSimpleText = (props: TabSimpleTextProps) => {
  return (
    <Tabs {...props}>
      <SimpleTextV2 text={[]} columns={[]} />
    </Tabs>
  )
}

export default TabsSimpleText
