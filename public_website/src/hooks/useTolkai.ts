import { useEffect } from 'react'

import type { VendorConsent } from './useConsent'

/**
 * Hook pour charger le chatbot Tolk.ai
 * Respecte le consentement utilisateur via Axeptio
 */
export const useTolkai = (acceptedVendors: VendorConsent) => {
  const hasAcceptedChatbot = acceptedVendors['tolkai']

  useEffect(() => {
    if (!hasAcceptedChatbot) {
      return
    }

    const botId = process.env['NEXT_PUBLIC_TOLKAI_BOT_ID']

    if (!botId) {
      console.warn(
        '[Tolk.ai] NEXT_PUBLIC_TOLKAI_BOT_ID is not defined. Chatbot will not load.'
      )
      return
    }

    // Guard : ne pas charger le script deux fois
    if (document.getElementById('lightchat-bot')) {
      return
    }

    const script = document.createElement('script')
    script.id = 'lightchat-bot'
    script.src = 'https://genii-script.tolk.ai/lightchat.js'
    script.async = true
    script.type = 'module'
    script.setAttribute('project-id', botId)
    script.setAttribute('template', 'widget')
    script.onerror = () => {
      console.error('[Tolk.ai] Failed to load chatbot script')
      // Nettoyer pour permettre une nouvelle tentative au prochain render
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }

    document.body.appendChild(script)

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
      // The lightchat SDK may create a widget container; hide it on cleanup
      // since no public destroy API is available.
      const widget = document.getElementById('lightchat-widget')
      if (widget) {
        widget.style.display = 'none'
      }
    }
  }, [hasAcceptedChatbot])
}
