import { useEffect } from 'react'

declare global {
  interface Window {
    axeptioSettings?: {
      clientId: string
      cookiesVersion: string
    }
  }
}

export const useAxeptio = () => {
  useEffect(() => {
    if (window.axeptioSettings) {
      return
    }

    const script = document.createElement('script')
    script.async = true
    script.innerHTML = `
      window.axeptioSettings = { clientId: "66bcc4aa49e3d3d814d9f71b", cookiesVersion: "siteinstit testing-fr-EU", };
      (function(d, s) {
        var t = d.getElementsByTagName(s)[0], e = d.createElement(s);
        e.async = true; e.src = "//static.axept.io/sdk-slim.js";
        t.parentNode.insertBefore(e, t);
      })(document, "script");
    `
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])
}
