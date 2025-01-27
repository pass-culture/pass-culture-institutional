import React from 'react'

import { DoublePushCTA } from '../DoublePushCta'
import Tabs from './Tabs'
import { ComponentBlockTabsPushGreyCtaFragment } from '@/generated/graphql'

const TabsPushGreyCta = (props: ComponentBlockTabsPushGreyCtaFragment) => {
  return (
    <Tabs {...props}>
      <DoublePushCTA
        requiredTitle=""
        requiredImage={undefined}
        firstCta={{
          id: '',
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
