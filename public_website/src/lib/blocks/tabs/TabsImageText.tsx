import React from 'react'

import { ImageText } from '../ImageText'
import Tabs from './Tabs'
import { TabImageTextProps } from '@/types/props'

const TabsImageText = (props: TabImageTextProps) => {
  return (
    <Tabs {...props}>
      <ImageText text={[]} />
    </Tabs>
  )
}

export default TabsImageText
