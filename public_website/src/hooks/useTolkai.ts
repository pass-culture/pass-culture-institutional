import { useEffect } from 'react'

declare global {
  interface Window {
    tcfbot?: string
    TcfWbchtParams?: { behaviour: string }
  }
}

/**
 * Hook pour charger le chatbot Tolk.ai
 * Respecte le consentement utilisateur via Axeptio
 */
export const useTolkai = (acceptedVendors: Record<string, boolean>) => {
  const hasAcceptedChatbot = acceptedVendors['tolkai']

  useEffect(() => {
    if (!hasAcceptedChatbot) {
      return
    }

    const botId = process.env.NEXT_PUBLIC_TOLKAI_BOT_ID

    if (!botId) {
      console.warn(
        '[Tolk.ai] NEXT_PUBLIC_TOLKAI_BOT_ID is not defined. Chatbot will not load.'
      )
      return
    }

    // Guard : ne pas charger le script deux fois
    if (window.tcfbot) {
      return
    }

    // Configuration globale Tolk.ai (requise avant le chargement du script)
    window.tcfbot = botId
    window.TcfWbchtParams = { behaviour: 'default' }

    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = 'https://script.tolk.ai/iframe-latest.js'
    script.async = true
    script.onerror = () => {
      console.error('[Tolk.ai] Failed to load chatbot script')
      // Nettoyer pour permettre une nouvelle tentative au prochain render
      delete window.tcfbot
      delete window.TcfWbchtParams
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }

    document.body.appendChild(script)

    return () => {
      // Note : ce cleanup retire le <script> et les globals Tolk.ai,
      // mais le widget DOM (iframe) déjà créé par le SDK n'est pas détruit.
      // Tolk.ai ne semble pas exposer d'API de destruction publique.
      // En pratique, le retrait de consentement est géré côté Axeptio
      // (le SDK bloque les cookies), mais le widget reste visible jusqu'au reload.
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
      delete window.tcfbot
      delete window.TcfWbchtParams
    }
  }, [hasAcceptedChatbot])
}
