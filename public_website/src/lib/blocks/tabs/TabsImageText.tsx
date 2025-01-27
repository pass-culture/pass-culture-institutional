import React from 'react'

import { ImageText } from '../ImageText'
import Tabs from './Tabs'
import { ComponentBlockTabsImageTextFragment } from '@/generated/graphql'

const TabsImageText = (props: ComponentBlockTabsImageTextFragment) => {
  return (
    <Tabs {...props}>
      <ImageText id="" jsonText={[]} />
    </Tabs>
  )
}

export default TabsImageText
