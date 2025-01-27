import React from 'react'

import { SimpleTextV2 } from '../SimpleTextV2'
import Tabs from './Tabs'
import { ComponentBlockTabsSimpleTextFragment } from '@/generated/graphql'

const TabsSimpleText = (props: ComponentBlockTabsSimpleTextFragment) => {
  return (
    <Tabs {...props}>
      <SimpleTextV2 jsonText={[]} columns={[]} />
    </Tabs>
  )
}

export default TabsSimpleText
