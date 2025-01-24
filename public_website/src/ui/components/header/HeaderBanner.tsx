import React from 'react'

import { AppBanner } from '../app-banner/AppBanner'
import { useOnClickAnalytics } from '@/hooks/useOnClickAnalytics'
import BlockRendererWithCondition from '@/lib/BlockRendererWithCondition'
import { isRenderable } from '@/utils/isRenderable'

export type HeaderBannerProps = {
  bannerText?: string | null
  bannerAndroidUrl?: string | null
  bannerDefaultUrl?: string | null
  bannerIosUrl?: string | null
}

const HeaderBanner = (props: HeaderBannerProps) => {
  const {
    bannerText,
    bannerAndroidUrl,
    bannerDefaultUrl = '',
    bannerIosUrl,
  } = props

  const { onClickAnalytics } = useOnClickAnalytics()

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
