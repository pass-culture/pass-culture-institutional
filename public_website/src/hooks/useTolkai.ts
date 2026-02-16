import { useEffect } from 'react'

import { useConsent } from './useConsent'

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
export const useTolkai = () => {
  const acceptedVendors = useConsent()

  useEffect(() => {
    // Vérifier que l'utilisateur a accepté les cookies chatbot
    // TODO: Ajouter 'chatbot' comme vendor dans Axeptio
    // Pour l'instant, on utilise 'firebase' comme proxy (à ajuster)
    const hasAcceptedChatbot = acceptedVendors['tolkai']

    if (!hasAcceptedChatbot) {
      return
    }

    // Récupérer l'ID du bot depuis les variables d'environnement
    const botId = process.env.NEXT_PUBLIC_TOLKAI_BOT_ID

    if (!botId) {
      console.warn(
        '[Tolk.ai] NEXT_PUBLIC_TOLKAI_BOT_ID is not defined. Chatbot will not load.'
      )
      return
    }

    // Vérifier si le script n'est pas déjà chargé
    if (window.tcfbot) {
      return
    }

    // Configuration globale Tolk.ai
    window.tcfbot = botId
    window.TcfWbchtParams = { behaviour: 'default' }

    // Charger le script Tolk.ai
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = 'https://script.tolk.ai/iframe-latest.js'
    script.async = true
    script.onload = () => {
      console.log('[Tolk.ai] Chatbot loaded successfully')
    }
    script.onerror = () => {
      console.error('[Tolk.ai] Failed to load chatbot script')
    }

    document.body.appendChild(script)

    // Cleanup function
    return () => {
      // Retirer le script du DOM si le composant est démonté
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
      // Nettoyer les variables globales
      delete window.tcfbot
      delete window.TcfWbchtParams
    }
  }, [acceptedVendors])
}
