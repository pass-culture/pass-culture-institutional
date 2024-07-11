import React from 'react'

import { LittleList } from '../LittleList'
import Tabs from './Tabs'
import { TabImageTextProps } from '@/types/props'

const TabsLittleList = (props: TabImageTextProps) => {
  return (
    <Tabs {...props}>
      <LittleList />
    </Tabs>
  )
}

export default TabsLittleList
