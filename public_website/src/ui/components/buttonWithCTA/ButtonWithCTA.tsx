import React, { ComponentProps, FunctionComponent } from 'react'

import { Button } from '../button/Button'
import { onClickAnalytics } from '@/lib/analytics/helpers'
import { CTA } from '@/types/CTA'

type Props = {
  cta: CTA
} & Omit<ComponentProps<typeof Button>, 'children' | 'href' | 'onClick'>

export const ButtonWithCTA: FunctionComponent<Props> = ({ cta, ...props }) => (
  <Button onClick={onClickAnalytics(cta)} href={cta.URL} {...props}>
    {cta.Label}
  </Button>
)
