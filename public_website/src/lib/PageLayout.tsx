import React from 'react'

import { Seo } from './seo/seo'
import { StyledSocialMedia } from '@/theme/style'
import { PageLayoutProps, SocialMediaProps } from '@/types/props'
import Title from '@/ui/components/title/Title'

const PageLayout = (props: PageLayoutProps) => {
  const { seo, title, socialMediaSection, children } = props
  return (
    <React.Fragment>
      {!!seo && <Seo metaData={seo} />}
      {!!title && <Title title={title} />}
      {children}
      {!!socialMediaSection && (
        <StyledSocialMedia {...(socialMediaSection as SocialMediaProps)} />
      )}
    </React.Fragment>
  )
}

export default PageLayout
