import React from 'react'

import { LittleList } from '../LittleList'
import Tabs from './Tabs'
import { ComponentBlockTabsLittleListFragment } from '@/generated/graphql'

const TabsLittleList = (props: ComponentBlockTabsLittleListFragment) => {
  return (
    <Tabs {...props}>
      <LittleList />
    </Tabs>
  )
}

export default TabsLittleList
