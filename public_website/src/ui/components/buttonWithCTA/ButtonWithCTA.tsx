import React, { ComponentProps, FunctionComponent } from 'react'

import { Button } from '../button/Button'
import { ComponentCommonLinkFragment } from '@/generated/graphql'
import { useOnClickAnalytics } from '@/hooks/useOnClickAnalytics'

type Props = {
  cta: ComponentCommonLinkFragment
} & Omit<ComponentProps<typeof Button>, 'children' | 'href' | 'onClick'>

export const ButtonWithCTA: FunctionComponent<Props> = ({ cta, ...props }) => {
  const { onClickAnalytics } = useOnClickAnalytics()

  return (
    <Button onClick={() => onClickAnalytics(cta)} href={cta.URL} {...props}>
      {cta.Label}
    </Button>
  )
}
