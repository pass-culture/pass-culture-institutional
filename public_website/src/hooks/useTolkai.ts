import { useEffect } from 'react'


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
    script.onerror = () => {
      console.error('[Tolk.ai] Failed to load chatbot script')
      // Nettoyer pour permettre une nouvelle tentative au prochain render
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }

    document.body.appendChild(script)

    const tag = document.querySelector('#lightchat-bot')
    if (tag) {
      tag.setAttribute('project-id', botId)
      tag.setAttribute('template', 'widget')
    }

    return () => {
      // Note : ce cleanup retire le <script>,
      // mais le widget DOM déjà créé par le SDK n'est pas détruit.
      // En pratique, le retrait de consentement est géré côté Axeptio
      // (le SDK bloque les cookies), mais le widget reste visible jusqu'au reload.
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [hasAcceptedChatbot])
}
