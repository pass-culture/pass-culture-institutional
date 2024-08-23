import React, { ComponentProps, FunctionComponent } from 'react'

import { Button } from '../button/Button'
import { useOnClickAnalytics } from '@/hooks/useOnClickAnalytics'
import { CTA } from '@/types/CTA'

type Props = {
  cta: CTA
} & Omit<ComponentProps<typeof Button>, 'children' | 'href' | 'onClick'>

export const ButtonWithCTA: FunctionComponent<Props> = ({ cta, ...props }) => {
  const { onClickAnalytics } = useOnClickAnalytics()

  return (
    <Button onClick={() => onClickAnalytics(cta)} href={cta.URL} {...props}>
      {cta.Label}
    </Button>
  )
}
