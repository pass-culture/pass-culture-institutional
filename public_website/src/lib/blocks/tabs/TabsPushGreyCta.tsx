import React from 'react'

import { DoublePushCTA } from '../DoublePushCta'
import Tabs from './Tabs'
import { TabPushGreyProps } from '@/types/props'

const TabsPushGreyCta = (props: TabPushGreyProps) => {
  return (
    <Tabs {...props}>
      <DoublePushCTA
        title=""
        image={undefined}
        firstCta={{
          Label: '',
          URL: '',
          eventName: undefined,
          eventOrigin: undefined,
        }}
        {...props}
      />
    </Tabs>
  )
}

export default TabsPushGreyCta
