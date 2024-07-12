import React from 'react'

import { AppBanner } from '../app-banner/AppBanner'
import { onClickAnalytics } from '@/lib/analytics/helpers'
import BlockRendererWithCondition from '@/lib/BlockRendererWithCondition'
import { BannerProps } from '@/types/props'
import { isRenderable } from '@/utils/isRenderable'

const HeaderBanner = (props: BannerProps) => {
  const {
    bannerText,
    bannerAndroidUrl,
    bannerDefaultUrl = '',
    bannerIosUrl,
  } = props

  const isRenderBanner = (): boolean => {
    return (
      isRenderable(bannerText) &&
      isRenderable(bannerAndroidUrl) &&
      isRenderable(bannerIosUrl)
    )
  }

  const trackEvent = (): void => {
    onClickAnalytics({
      eventName: 'downloadApp',
      eventOrigin: 'menu-young-people-and-parents',
    })
  }

  return (
    <BlockRendererWithCondition condition={isRenderBanner()}>
      <AppBanner
        title={bannerText}
        androidUrl={bannerAndroidUrl}
        iosUrl={bannerIosUrl}
        defaultUrl={bannerDefaultUrl}
        onClick={trackEvent}
      />
    </BlockRendererWithCondition>
  )
}

export default HeaderBanner
