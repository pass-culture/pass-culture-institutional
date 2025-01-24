import React from 'react'

import { Seo } from './seo/seo'
import {
  ComponentBlockSocialMediaFragment,
  ComponentSharedSeoFragment,
} from '@/generated/graphql'
import { StyledSocialMedia } from '@/theme/style'
import Title from '@/ui/components/title/Title'

type PageLayoutProps = {
  seo: ComponentSharedSeoFragment | undefined | null
  title: string | undefined
  socialMediaSection: ComponentBlockSocialMediaFragment | undefined | null
  children: React.ReactNode
}

const PageLayout = (props: PageLayoutProps) => {
  const { seo, title, socialMediaSection, children } = props
  return (
    <React.Fragment>
      {!!seo && <Seo metaData={seo} />}
      {!!title && <Title title={title} />}
      {children}
      {!!socialMediaSection && <StyledSocialMedia {...socialMediaSection} />}
    </React.Fragment>
  )
}

export default PageLayout
