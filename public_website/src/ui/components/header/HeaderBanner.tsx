import React from 'react'

import { AppBanner } from '../app-banner/AppBanner'
import { onClickAnalytics } from '@/lib/analytics/helpers'
import { BannerProps } from '@/types/props'

const HeaderBanner = (props: BannerProps) => {
  const { bannerText, bannerAndroidUrl, bannerDefaultUrl, bannerIosUrl } = props

  const isRenderBanner = (): boolean => {
    if (bannerText && bannerAndroidUrl && bannerIosUrl) return true
    return false
  }

  const trackEvent = (): void => {
    onClickAnalytics({
      eventName: 'downloadApp',
      eventOrigin: 'menu-young-people-and-parents',
    })
  }

  return isRenderBanner() ? (
    <AppBanner
      title={bannerText}
      androidUrl={bannerAndroidUrl}
      iosUrl={bannerIosUrl}
      defaultUrl={bannerDefaultUrl}
      onClick={trackEvent}
    />
  ) : null
}

export default HeaderBanner
